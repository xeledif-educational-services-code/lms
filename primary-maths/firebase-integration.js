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
      renderAuthUI();
      resolve(currentRole);
    });
  });

  // We landed here via a magic link and nobody is signed in yet.
  // Show a "tap to finish" button instead of calling the SDK now.
  if (cameFromEmailLink && !currentUser) {
    pendingEmailLinkSignIn = true;
    pendingEmailLinkEmail = window.localStorage.getItem('xeledif.emailForSignIn') || null;
    renderAuthUI();
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
    // Re-throw so callers (real-time sync, dashboard reconciliation)
    // can tell the write did NOT actually make it to Firestore,
    // instead of silently assuming success.
    throw err;
  }
}

async function cloudDeleteAttempt(attemptId) {
  if (!currentUser || !fbDb) return;
  await fbDb.collection('progress').doc(attemptId).delete();
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