/* firebase-integration.js
   Plain-JS Firebase integration using the compat SDK.
   Loaded via <script src="firebase-integration.js"></script>
   after the three Firebase compat SDK scripts. */

// ─── CONFIG — EDIT THESE VALUES ─────────────────────────────

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDRFvL5MpbUqPEUf8rZW3T2-4WiIUB0R00",
  authDomain: "xeledif-lms.firebaseapp.com",
  projectId: "xeledif-lms",
  storageBucket: "xeledif-lms.firebasestorage.app",
  messagingSenderId: "712004730691",
  appId: "1:712004730691:web:d965cbe79b6b20f309f9f6"
};

const TEACHER_EMAIL = "xeledifeducationalservices@gmail.com";
// ─────────────────────────────────────────────────────────────


let fbAuth = null;
let fbDb = null;
let currentUser = null;
let currentRole = null;
let roleReady = null;  // promise that resolves once role is known

// ── Email-link sign-in state ──────────────────────────────────
// We deliberately do NOT call signInWithEmailLink() automatically
// on page load. The oobCode in the link is single-use, and some
// email providers (very common on school/university Office 365
// tenants — "Safe Links"/ATP) pre-visit links to scan them for
// phishing before the person ever taps them. If sign-in completes
// the instant the page loads, the scanner's visit burns the code,
// and the real person gets "auth/invalid-action-code: ...already
// been used." Requiring an actual button tap avoids that, because
// scanners fetch pages — they don't press buttons.
let pendingEmailLinkSignIn = false;
let pendingEmailLinkEmail = null;
let signInBusy = false;
let lastSignInError = null;

// ── Full-page access gate ───────────────────────────────────────
// Deters casual/unauthorized use of a shared link by blocking view
// and interaction with the whole page until someone is signed in.
// This is a UX/access-log deterrent, not a real security boundary:
// the page's HTML/JS is still delivered to any browser that
// requests it, so a technically able visitor could still disable
// JavaScript or read page source to get at it. Genuine content
// protection would require serving lesson content from Firestore
// behind an auth-gated read rule instead of embedding it in the
// page. What this DOES achieve: nobody can see or interact with a
// lesson without first receiving and clicking a magic-link email
// tied to a real address — a real, logged access record.
const GATE_HTML_CLASS = 'xeledif-gate-active';

function showGate() {
  document.documentElement.classList.add(GATE_HTML_CLASS);
  const gate = document.getElementById('xeledif-auth-gate');
  if (gate) { gate.style.display = 'flex'; renderGate(gate); }
}
function hideGate() {
  document.documentElement.classList.remove(GATE_HTML_CLASS);
  const gate = document.getElementById('xeledif-auth-gate');
  if (gate) gate.style.display = 'none';
}
function refreshGate() {
  if (!document.documentElement.classList.contains(GATE_HTML_CLASS)) return;
  const gate = document.getElementById('xeledif-auth-gate');
  if (gate) renderGate(gate);
}

function renderGate(gate) {
  if (pendingEmailLinkSignIn) {
    gate.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:28px;max-width:360px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.4);">
        <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:8px;">Xeledif Maths — Private Access</div>
        <div style="font-size:13px;color:#555;margin-bottom:16px;">✉️ Sign-in link detected for this device.</div>
        <button id="gate-finish-signin-btn" onclick="completeEmailLinkSignIn()" ${signInBusy ? 'disabled' : ''}
                style="width:100%;padding:10px;border-radius:8px;border:none;background:#5B21B6;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">
          ${signInBusy ? 'Signing in…' : 'Tap to finish signing in'}
        </button>
      </div>`;
    return;
  }

  const errorHtml = lastSignInError
    ? `<div style="color:#712B13;background:#FAECE7;border:1px solid #F0997B;border-radius:6px;padding:8px 10px;font-size:12px;margin-bottom:12px;text-align:left;">
         ${lastSignInError.code === 'auth/invalid-action-code'
            ? 'That sign-in link has already been used or has expired. Request a new one below.'
            : 'Sign-in failed: ' + lastSignInError.message}
       </div>`
    : '';

  gate.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:28px;max-width:360px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.4);text-align:left;">
      <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px;">🔒 Private learning platform</div>
      <div style="font-size:13px;color:#555;margin-bottom:16px;line-height:1.5;">
        This site is for registered pupils only. Enter the email your teacher registered for you to receive a sign-in link.
      </div>
      ${errorHtml}
      <input id="gate-email" type="email" placeholder="your@email.com"
             style="width:100%;padding:10px;font-size:14px;border-radius:8px;border:1px solid #ddd;font-family:inherit;box-sizing:border-box;margin-bottom:10px;">
      <button onclick="handleGateSignInClick()"
              style="width:100%;padding:10px;border-radius:8px;border:none;background:#5B21B6;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">
        Send sign-in link
      </button>
    </div>`;
}

async function handleGateSignInClick() {
  const input = document.getElementById('gate-email');
  const email = (input?.value || '').trim();
  if (!email) { alert('Please enter your email.'); return; }
  try {
    lastSignInError = null;
    await sendSignInLink(email);
    alert('Check your inbox — a sign-in link has been sent to ' + email +
          '\n\nOpen it on THIS device/browser, then tap the button that appears.');
  } catch (err) {
    alert('Could not send sign-in link: ' + err.message);
  }
}

// ── Pupil-identity binding ──────────────────────────────────────
// The dashboard groups scores by a "pupil name" string. Previously
// that name was just typed into a per-device prompt, completely
// disconnected from who was actually signed in — so a signed-in
// pupil could type any name at all, and the same device re-prompted
// separately for every different visitor. Now the display name is
// resolved once per ACCOUNT (stored in that pupil's Firestore user
// document, asked for only the first time), so it follows the pupil
// to any device they sign into and can't be freely retyped.
window.__xeledifPupilName = null;

function initFirebaseCompat() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded — offline mode.');
    roleReady = Promise.resolve(null);
    return;
  }
  firebase.initializeApp(FIREBASE_CONFIG);
  fbAuth = firebase.auth();
  fbDb = firebase.firestore();

  const cameFromEmailLink = fbAuth.isSignInWithEmailLink(window.location.href);

  roleReady = new Promise((resolve) => {
    fbAuth.onAuthStateChanged(async (user) => {
      currentUser = user;

      // Already signed in but a leftover magic link is still in the
      // URL (stale email re-opened, link clicked twice, etc.) — just
      // scrub the URL instead of trying to "use" a dead code.
      if (user && cameFromEmailLink) {
        pendingEmailLinkSignIn = false;
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (!user) {
        currentRole = null;
        resolve(null);
        renderAuthUI();
        showGate();
        return;
      }
      // Ensure a user doc exists with a role
      const ref = fbDb.collection('users').doc(user.uid);
      const snap = await ref.get();
      if (snap.exists) {
        currentRole = snap.data().role;
      } else {
        currentRole = (user.email || '').toLowerCase() === TEACHER_EMAIL.toLowerCase()
          ? 'teacher' : 'pupil';
        await ref.set({
          email: user.email || '',
          role: currentRole,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      // Resolve this pupil's stable display name (see the
      // pupil-identity-binding note above). Teachers don't need one.
      if (currentRole !== 'teacher') {
        const existingData = snap.exists ? snap.data() : null;
        if (existingData && existingData.pupilName) {
          window.__xeledifPupilName = existingData.pupilName;
        } else {
          let name = (window.prompt("What name should appear on your teacher's dashboard?") || '').trim();
          if (!name) name = user.email || 'Pupil';
          window.__xeledifPupilName = name;
          try {
            await ref.set({ pupilName: name }, { merge: true });
          } catch (err) {
            console.warn('Could not save pupil display name:', err);
          }
        }
        try {
          localStorage.setItem('xeledif.pupilNameFor.' + user.uid, window.__xeledifPupilName);
        } catch (err) { /* non-fatal */ }
      }

      renderAuthUI();
      hideGate();
      resolve(currentRole);

      // Catch-up sync: push any locally-recorded attempts on THIS
      // device now that we know for certain we're signed in. This
      // covers the case where a pupil started answering questions
      // before tapping "Tap to finish signing in" (or before the
      // sign-in confirmation had finished processing) — those
      // per-answer syncs would have silently no-op'd at the time
      // because getFirebaseUser() was still null. It also re-tries
      // anything that failed to sync earlier due to a network blip.
      syncAllLocalAttempts();
    });
  });

  // We landed here via a magic link and nobody is signed in yet.
  // Show a "tap to finish" button instead of calling the SDK now.
  if (cameFromEmailLink && !currentUser) {
    pendingEmailLinkSignIn = true;
    pendingEmailLinkEmail = window.localStorage.getItem('xeledif.emailForSignIn') || null;
    renderAuthUI();
    showGate();
  }
}

function waitForRole() {
  return roleReady || Promise.resolve(null);
}

function getFirebaseUser() { return currentUser; }
function getFirebaseRole() { return currentRole; }

async function sendSignInLink(email) {
  const actionCodeSettings = {
    url: window.location.origin + window.location.pathname,
    handleCodeInApp: true
  };
  await fbAuth.sendSignInLinkToEmail(email, actionCodeSettings);
  window.localStorage.setItem('xeledif.emailForSignIn', email);
}

// Runs ONLY when the person taps "Tap to finish signing in" —
// never automatically. This is the fix for auth/invalid-action-code
// caused by link-scanning email security systems.
async function completeEmailLinkSignIn() {
  if (signInBusy) return;

  let email = pendingEmailLinkEmail;
  if (!email) {
    email = (window.prompt('Confirm the email address this link was sent to:') || '').trim();
  }
  if (!email) return;

  signInBusy = true;
  lastSignInError = null;
  renderAuthUI();

  try {
    await fbAuth.signInWithEmailLink(email, window.location.href);
    // onAuthStateChanged fires next and re-renders the bar.
  } catch (err) {
    console.warn('signInWithEmailLink failed:', err);
    pendingEmailLinkSignIn = false;
    lastSignInError = err;
    renderAuthUI();
    refreshGate();
  } finally {
    signInBusy = false;
    window.localStorage.removeItem('xeledif.emailForSignIn');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

async function doSignOut() {
  // Clear caches so the next user doesn't see stale data
  localStorage.removeItem('xeledif.progress.v2');
  localStorage.removeItem('xeledif.activeAttempt');
  localStorage.removeItem('xeledif.migrationDone');
  localStorage.removeItem('xeledif.syncedAttempts');
  window.__xeledifPupilName = null;
  if (fbAuth) await fbAuth.signOut();
  location.reload();
}

/* ─── Firestore writes ─── */

async function cloudWriteAttempt(rec) {
  if (!currentUser || !fbDb) return;
  try {
    await fbDb.collection('progress').doc(rec.attemptId).set({
      ...rec,
      pupilUid: currentUser.uid,
      pupilEmail: currentUser.email || ''
    }, { merge: true });
  } catch (err) {
    console.warn('cloudWriteAttempt failed:', err.message);
    // Re-throw so callers (real-time sync, dashboard reconciliation,
    // catch-up sync) can tell the write did NOT actually make it to
    // Firestore, instead of silently assuming success.
    throw err;
  }
}

async function cloudDeleteAttempt(attemptId) {
  if (!currentUser || !fbDb) return;
  await fbDb.collection('progress').doc(attemptId).delete();
}

// Push every eligible attempt sitting in this device's localStorage
// to Firestore. Safe to call repeatedly — writes are idempotent
// (merge:true), and we skip anything already confirmed synced AND
// completed, so this doesn't grow into unbounded re-writes over time.
async function syncAllLocalAttempts() {
  if (!currentUser || !fbDb) return;

  let all;
  try { all = JSON.parse(localStorage.getItem('xeledif.progress.v2')) || {}; }
  catch { all = {}; }

  let syncedIds;
  try { syncedIds = new Set(JSON.parse(localStorage.getItem('xeledif.syncedAttempts')) || []); }
  catch { syncedIds = new Set(); }

  const candidates = Object.values(all).filter(rec =>
    rec && rec.attemptId &&
    !rec.attemptId.startsWith('smoke-test-') &&
    rec.stepId !== 'test-step' &&
    rec.answered > 0 &&
    !(syncedIds.has(rec.attemptId) && rec.completed)
  );

  for (const rec of candidates) {
    try {
      await cloudWriteAttempt(rec);
      syncedIds.add(rec.attemptId);
    } catch (err) {
      console.warn('[sync] catch-up upload failed for', rec.attemptId, err);
      // Leave it out of syncedIds — we'll retry next time this runs.
    }
  }

  try {
    localStorage.setItem('xeledif.syncedAttempts', JSON.stringify([...syncedIds]));
  } catch (err) {
    console.warn('[sync] could not persist synced-attempt bookkeeping:', err);
  }
}

/* ─── Firestore reads ─── */

function cloudSubscribeAll(callback) {
  if (!fbDb) return () => {};
  return fbDb.collection('progress').onSnapshot(snap => {
    const out = {};
    snap.forEach(d => { out[d.id] = d.data(); });
    callback(out);
  }, err => console.warn('cloudSubscribeAll error:', err));
}

function cloudSubscribeMy(callback) {
  if (!fbDb || !currentUser) return () => {};
  return fbDb.collection('progress')
    .where('pupilUid', '==', currentUser.uid)
    .onSnapshot(snap => {
      const out = {};
      snap.forEach(d => { out[d.id] = d.data(); });
      callback(out);
    }, err => console.warn('cloudSubscribeMy error:', err));
}

/* ─── Auth UI (injected into <div id="auth-bar"></div>) ─── */

function renderAuthUI() {
  const bar = document.getElementById('auth-bar');
  if (!bar) return;

  if (currentUser) {
    const roleLabel = currentRole === 'teacher' ? '👩‍🏫 Teacher' : '🎓 Pupil';
    bar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;font-size:13px;">
        <span style="color:#555;">${roleLabel} · ${currentUser.email || ''}</span>
        <button onclick="doSignOut()" style="padding:4px 10px;font-size:12px;border-radius:6px;border:1px solid #ddd;background:#fff;cursor:pointer;font-family:inherit;">Sign out</button>
      </div>`;
    return;
  }

  // Arrived via a magic link but sign-in hasn't been completed yet —
  // wait for a genuine tap before calling the Firebase SDK.
  if (pendingEmailLinkSignIn) {
    bar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;font-size:13px;flex-wrap:wrap;">
        <span style="color:#555;">✉️ Sign-in link detected for this device.</span>
        <button id="finish-signin-btn" onclick="completeEmailLinkSignIn()" ${signInBusy ? 'disabled' : ''}
                style="padding:6px 12px;font-size:13px;border-radius:6px;border:none;background:#5B21B6;color:#fff;cursor:pointer;font-family:inherit;">
          ${signInBusy ? 'Signing in…' : 'Tap to finish signing in'}
        </button>
      </div>`;
    return;
  }

  const errorBanner = lastSignInError
    ? `<div style="color:#712B13;background:#FAECE7;border:1px solid #F0997B;border-radius:6px;padding:6px 10px;font-size:12px;margin-bottom:6px;max-width:420px;">
         ${lastSignInError.code === 'auth/invalid-action-code'
            ? 'That sign-in link has already been used, or has expired. Please request a new one below.'
            : 'Sign-in failed: ' + lastSignInError.message}
       </div>`
    : '';

  bar.innerHTML = `
    ${errorBanner}
    <div style="display:flex;align-items:center;gap:8px;font-size:13px;flex-wrap:wrap;">
      <input id="auth-email" type="email" placeholder="your@email.com"
             style="padding:6px 10px;font-size:13px;border-radius:6px;border:1px solid #ddd;font-family:inherit;">
      <button onclick="handleSignInClick()"
              style="padding:6px 12px;font-size:13px;border-radius:6px;border:none;background:#5B21B6;color:#fff;cursor:pointer;font-family:inherit;">
        Sign in
      </button>
    </div>`;
}

async function handleSignInClick() {
  const input = document.getElementById('auth-email');
  const email = (input?.value || '').trim();
  if (!email) { alert('Please enter your email.'); return; }
  try {
    lastSignInError = null;
    await sendSignInLink(email);
    alert('Check your inbox — a sign-in link has been sent to ' + email +
          '\n\nOpen it on THIS device/browser if you can, then tap the ' +
          '"Tap to finish signing in" button that appears.');
  } catch (err) {
    alert('Could not send sign-in link: ' + err.message);
  }
}

/* ─── Init ─── */
initFirebaseCompat();