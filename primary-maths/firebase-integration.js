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
const AUTH_WATCHDOG_MS   = 12000;  // give up waiting for the sign-in result after 12 s
const PROFILE_TIMEOUT_MS = 10000;  // give up on the profile read after 10 s
let authSettled = false;           // true once the gate has been shown or hidden

// ── Email-link sign-in state ──────────────────────────────────
let pendingEmailLinkSignIn = false;
let pendingEmailLinkEmail = null;
let signInBusy = false;
let lastSignInError = null;

const GATE_HTML_CLASS = 'xeledif-gate-active';


/* ---------- Sign-in gate: state is remembered, so it works whatever the load order ---------- */
// What the gate should currently show: 'loading' | 'signin' | 'open' | 'problem'.
// WHY a remembered state: this file runs in <head>, often BEFORE the gate <div>
// exists. A direct DOM update would silently do nothing in that case. Instead we
// record the intent and apply it now AND again on DOMContentLoaded.
let gateMode = 'loading';
let gateProblemInfo = null;

function applyGate() {
  const gate = document.getElementById('xeledif-auth-gate');
  if (!gate) return;                          // page not parsed yet; DOMContentLoaded calls us again
  if (gateMode === 'open') {
    document.documentElement.classList.remove(GATE_HTML_CLASS);
    gate.style.display = 'none';
  } else if (gateMode === 'signin') {
    document.documentElement.classList.add(GATE_HTML_CLASS);
    gate.style.display = 'flex';
    renderGate(gate);
  } else if (gateMode === 'problem' && gateProblemInfo) {
    document.documentElement.classList.add(GATE_HTML_CLASS);
    gate.style.display = 'flex';
    renderProblem(gate, gateProblemInfo);
  }
  // 'loading': leave the page's built-in "Loading…" markup alone.
}
document.addEventListener('DOMContentLoaded', applyGate);

// WHY authSettled is set here: the state is now recorded and WILL be applied,
// so the watchdog is correctly switched off only when something real was decided.
function showGate() { authSettled = true; gateMode = 'signin'; applyGate(); }

function hideGate() { authSettled = true; gateMode = 'open';   applyGate(); }

function refreshGate() { if (gateMode === 'signin') applyGate(); }


// A visible, recoverable error screen. Titles/details are fixed strings
// (never user input), so inserting them as HTML is safe.
function showGateProblem(title, detail) {
  authSettled = true;
  gateMode = 'problem';
  gateProblemInfo = { title, detail };
  applyGate();
}

// Titles/details are fixed strings (never user input), so HTML here is safe.
function renderProblem(gate, info) {
  gate.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:28px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.4);text-align:left;">
      <div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:6px;">⚠️ ${info.title}</div>
      <div style="font-size:13px;color:#555;margin-bottom:16px;line-height:1.5;">${info.detail}</div>
      <button onclick="location.reload()"
              style="width:100%;padding:10px;border-radius:8px;border:none;background:#5B21B6;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:8px;">
        Try again
      </button>
      <button onclick="resetThisDevice()"
              style="width:100%;padding:10px;border-radius:8px;border:1px solid #5B21B6;background:#fff;color:#5B21B6;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">
        Reset sign-in on this device
      </button>
      <div style="font-size:11.5px;color:#888;margin-top:10px;line-height:1.5;">
        “Reset” only signs this browser out. Your scores are safe in your account.
      </div>
    </div>`;
}

// Promise.race wrapper: rejects if `promise` takes longer than `ms`.
// WHY: a Firestore read can hang on a bad connection, and an
// await that never finishes is what froze the page on "Loading…".
function fbWithTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(label + ' timed out')), ms))
  ]);
}

// Clears this browser's saved sign-in so the pupil can start fresh.
// WHY it leaves xeledif.progress.v2 alone: it may hold answers that haven't
// reached Firestore yet; syncAllLocalAttempts() uploads them after the next sign-in.
async function resetThisDevice() {
  try { if (fbAuth) await fbAuth.signOut(); } catch (e) {}
  try {
    [localStorage, sessionStorage].forEach(store => {
      Object.keys(store)
        .filter(k => k.startsWith('firebase:') || k.startsWith('xeledif.summary.cache.') || k === 'xeledif.emailForSignIn')
        .forEach(k => store.removeItem(k));
    });
  } catch (e) {}

  // Firebase Auth keeps its persistence in this IndexedDB database.
  let done = false;
  const finish = () => { if (!done) { done = true; location.reload(); } };
  try {
    const req = indexedDB.deleteDatabase('firebaseLocalStorageDb');
    req.onsuccess = req.onerror = req.onblocked = finish;
    setTimeout(finish, 2500);   // never wait forever if the delete is blocked
  } catch (e) { finish(); }
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

      if (currentRole !== 'teacher') {
        const existingData = snap.exists ? snap.data() : null;
        // WHY: a name for the teacher stops the "Enter the pupil name for this device"
        // prompt and stops new records being saved as "Unknown".
        if (currentRole === 'teacher') window.__xeledifPupilName = 'Teacher';
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

      syncAllLocalAttempts();
    });
  });

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
    throw err;
  }
}

async function cloudDeleteAttempt(attemptId) {
  if (!currentUser || !fbDb) return;
  await fbDb.collection('progress').doc(attemptId).delete();
}

// Saves one display preference in the signed-in pupil's own users/{uid} document.
// WHY a whitelist: only known preference names can ever be written from the UI.
const ALLOWED_PREFERENCES = ['hideScores'];
async function cloudSetPreference(field, value) {
  if (!ALLOWED_PREFERENCES.includes(field)) throw new Error('Unknown preference: ' + field);
  if (!currentUser || !fbDb) throw new Error('Not signed in');
  // update() merges the field and leaves "role" untouched, which the Firestore rules require.
  await fbDb.collection('users').doc(currentUser.uid).update({ [field]: value });
  if (window.__xeledifPrefs) window.__xeledifPrefs[field] = value;
}

async function syncAllLocalAttempts() {
  if (!currentUser || !fbDb) return;

  if (currentRole === 'teacher') return;

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
    (!rec.pupilUid || rec.pupilUid === currentUser.uid) &&
    !(syncedIds.has(rec.attemptId) && rec.completed)
  );

  for (const rec of candidates) {
    try {
      await cloudWriteAttempt(rec);
      syncedIds.add(rec.attemptId);
    } catch (err) {
      console.warn('[sync] catch-up upload failed for', rec.attemptId, err);
    }
  }

  try {
    localStorage.setItem('xeledif.syncedAttempts', JSON.stringify([...syncedIds]));
  } catch (err) {
    console.warn('[sync] could not persist synced-attempt bookkeeping:', err);
  }
}

/* ============================================================
   Date range helper (M1 — Report Date Range)

   Single source of truth for "which attempts are in scope".
   Both cloudSubscribeAll (teacher) and cloudSubscribeMy (pupil)
   call this, so the report page and the index-page score widget
   (Feature 2, M3) will always agree on the period.

   Storage keys (shared with dashboard-consolidate.js and, later,
   index.html):
     xeledif.dash.days          '30' | '90' | 'all' | 'custom'
     xeledif.dash.customStart   'YYYY-MM-DD' (local date) or ''
     xeledif.dash.customEnd     'YYYY-MM-DD' (local date) or ''

   Returns { startISO, endISO } or null for 'all time'.
   The end date is treated as END OF DAY, inclusive.
   ============================================================ */
function dashRange() {
  let v;
  try { v = localStorage.getItem('xeledif.dash.days'); } catch (e) { v = null; }
  if (v === 'all') return null;

  if (v === 'custom') {
    let cs = '', ce = '';
    try {
      cs = localStorage.getItem('xeledif.dash.customStart') || '';
      ce = localStorage.getItem('xeledif.dash.customEnd')   || '';
    } catch (e) {}
    if (cs && ce) {
      const start = new Date(cs + 'T00:00:00.000');
      const end   = new Date(ce + 'T23:59:59.999');
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        return { startISO: start.toISOString(), endISO: end.toISOString() };
      }
    }
    // Fall through to the default if the custom range is incomplete/invalid.
  }

  const days = parseInt(v, 10) || 30;
  return {
    startISO: new Date(Date.now() - days * 86400000).toISOString(),
    endISO:   new Date().toISOString()
  };
}

/* ============================================================
   Teacher live feed — cloud is source of truth, filtered by range.
   ============================================================ */
let _allUnsub = null;
let _allCb = null;

function cloudSubscribeAll(callback) {
  if (!fbDb) return () => {};
  if (callback) _allCb = callback;
  if (_allUnsub) { try { _allUnsub(); } catch (e) {} _allUnsub = null; }

  let q = fbDb.collection('progress');
  const range = dashRange();
  if (range) {
    q = q.where('updatedAt', '>=', range.startISO)
         .where('updatedAt', '<=', range.endISO);
  }

  _allUnsub = q.onSnapshot(snap => {
    const out = {};
    snap.forEach(d => { out[d.id] = d.data(); });
    try { localStorage.setItem('xeledif.progress.v2', JSON.stringify(out)); } catch (e) {}
    window.__dashLoaded = snap.size;
    if (typeof window.__dashInfo === 'function') window.__dashInfo(snap.size);
    if (_allCb) _allCb(out);
  }, err => console.warn('cloudSubscribeAll error:', err));
  return () => { if (_allUnsub) _allUnsub(); };
}

/* ============================================================
   Pupil live feed — same range bounds. Requires composite index
   progress: (pupilUid ASC, updatedAt DESC).
   ============================================================ */
function cloudSubscribeMy(callback) {
  if (!fbDb || !currentUser) return () => {};

  let q = fbDb.collection('progress').where('pupilUid', '==', currentUser.uid);
  const range = dashRange();
  if (range) {
    q = q.where('updatedAt', '>=', range.startISO)
         .where('updatedAt', '<=', range.endISO);
  }

  return q.onSnapshot(snap => {
    const out = {};
    snap.forEach(d => { out[d.id] = d.data(); });
    callback(out);
  }, err => console.warn('cloudSubscribeMy error:', err));
}

/* ─── Auth UI ─── */

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