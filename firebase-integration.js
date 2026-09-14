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

function initFirebaseCompat() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded — offline mode.');
    roleReady = Promise.resolve(null);
    return;
  }
  firebase.initializeApp(FIREBASE_CONFIG);
  fbAuth = firebase.auth();
  fbDb = firebase.firestore();

  // Handle magic-link sign-in return
  if (fbAuth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('xeledif.emailForSignIn');
    if (!email) email = window.prompt('Confirm your email to finish sign-in:');
    if (email) {
      fbAuth.signInWithEmailLink(email, window.location.href).catch(err => {
        alert('Sign-in failed: ' + err.message);
      }).finally(() => {
        window.localStorage.removeItem('xeledif.emailForSignIn');
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    }
  }

  roleReady = new Promise((resolve) => {
    fbAuth.onAuthStateChanged(async (user) => {
      currentUser = user;
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
  } else {
    bar.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
        <input id="auth-email" type="email" placeholder="your@email.com"
               style="padding:6px 10px;font-size:13px;border-radius:6px;border:1px solid #ddd;font-family:inherit;">
        <button onclick="handleSignInClick()"
                style="padding:6px 12px;font-size:13px;border-radius:6px;border:none;background:#5B21B6;color:#fff;cursor:pointer;font-family:inherit;">
          Sign in
        </button>
      </div>`;
  }
}

async function handleSignInClick() {
  const input = document.getElementById('auth-email');
  const email = (input?.value || '').trim();
  if (!email) { alert('Please enter your email.'); return; }
  try {
    await sendSignInLink(email);
    alert('Check your inbox — a sign-in link has been sent to ' + email +
          '\n\nClick the link in that email to finish signing in.');
  } catch (err) {
    alert('Could not send sign-in link: ' + err.message);
  }
}

/* ─── One-time migration: upload existing localStorage progress ─── */
async function migrateLocalToCloud() {
  if (!currentUser || !fbDb) return;
  const KEY = 'xeledif.progress.v2';
  let localData = {};
  try { localData = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
  const entries = Object.values(localData);
  if (!entries.length) return;

  const ok = confirm(
    `Found ${entries.length} attempt(s) stored locally on this device.\n\n` +
    `Upload them to the cloud so they appear on the teacher dashboard?`
  );
  if (!ok) return;

  let uploaded = 0;
  for (const rec of entries) {
    if (!rec.attemptId) continue;
    await cloudWriteAttempt(rec);
    uploaded++;
  }
  alert(`Uploaded ${uploaded} attempt(s) to the cloud.`);
}

/* ─── Init ─── */
initFirebaseCompat();
