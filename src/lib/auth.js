// Demo-only client-side auth. A static site has no server, so real security
// (server-side sessions, rate limiting, DB) needs a backend before going live.
const USERS = 'bs_users', SESSION = 'bs_session', FAILS = 'bs_fails';
const IDLE_MS = 30 * 60 * 1000, MAX_FAILS = 5, LOCK_MS = 5 * 60 * 1000;
const enc = new TextEncoder();
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const read = (s, k, d) => { try { return JSON.parse(s.getItem(k)) ?? d; } catch { return d; } };
const write = (s, k, v) => { try { s.setItem(k, JSON.stringify(v)); } catch {} };

export const normPhone = (p) => p.replace(/[^0-9০-৯+]/g, '').replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
// Canonical local form (01XXXXXXXXX) so +8801… and 01… are the same account.
export const localPhone = (p) => normPhone(p).replace(/^\+?88(?=01)/, '');
export const validPhone =(p) => /^(?:\+?88)?01[3-9]\d{8}$/.test(normPhone(p));
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim()) && e.length <= 120;
export const strongPass = (p) => p.length >= 8 && /[a-z]/i.test(p) && /\d/.test(p);

async function hash(pass, saltHex) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveBits']);
  const salt = Uint8Array.from(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' }, key, 256));
}
const newSalt = () => hex(crypto.getRandomValues(new Uint8Array(16)));

export async function signup(name, email, phone, pass) {
  const users = read(localStorage, USERS, {}), id = localPhone(phone), em = email.trim().toLowerCase();
  if (users[id] || Object.values(users).some((x) => x.email === em)) return { error: 'An account with this email or number already exists.' };
  const salt = newSalt();
  users[id] = { name: name.trim(), email: em, phone: id, salt, hash: await hash(pass, salt), joined: Date.now() };
  write(localStorage, USERS, users);
  return startSession(users[id]);
}

// identifier = email or mobile number
export async function login(identifier, pass) {
  const all = read(localStorage, USERS, {}), raw = identifier.trim();
  const u = raw.includes('@') ? Object.values(all).find((x) => x.email === raw.toLowerCase()) : all[localPhone(raw)];
  const id = raw.includes('@') ? raw.toLowerCase() : localPhone(raw), fails = read(localStorage, FAILS, {}), f = fails[id] || { n: 0, until: 0 };
  if (f.until > Date.now()) return { error: `Too many failed attempts. Try again in ${Math.ceil((f.until - Date.now()) / 60000)} minutes.` };
  // Always run the hash so timing doesn't reveal whether the account exists.
  const h = await hash(pass, u ? u.salt : '00'.repeat(16));
  if (!u || h !== u.hash) {
    f.n += 1; if (f.n >= MAX_FAILS) { f.until = Date.now() + LOCK_MS; f.n = 0; }
    fails[id] = f; write(localStorage, FAILS, fails);
    return { error: 'Incorrect email/mobile or password.' };
  }
  delete fails[id]; write(localStorage, FAILS, fails);
  return startSession(u);
}

function startSession(u) {
  const s = { name: u.name, email: u.email, phone: u.phone, avatar: u.avatar || '', joined: u.joined, token: newSalt(), last: Date.now() };
  write(sessionStorage, SESSION, s);
  return { user: s };
}
export function currentUser() {
  const s = read(sessionStorage, SESSION, null);
  if (!s) return null;
  if (Date.now() - s.last > IDLE_MS) { logout(); return null; }
  s.last = Date.now(); write(sessionStorage, SESSION, s);
  return s;
}
export function logout() { try { sessionStorage.removeItem(SESSION); } catch {} window.dispatchEvent(new Event('bs-auth')); }

// ---------- Return to the requested page after login ----------
const AFTER_LOGIN = '/dashboard';
const AUTH_PAGES = ['/login', '/signup', '/forgot-password'];
// Only same-site paths are accepted, so ?next= can't redirect to another website.
export function safeNext(raw) {
  if (!raw) return AFTER_LOGIN;
  try {
    const u = new URL(raw, window.location.origin);
    if (u.origin !== window.location.origin || AUTH_PAGES.includes(u.pathname)) return AFTER_LOGIN;
    return u.pathname + u.search + u.hash;
  } catch {
    return AFTER_LOGIN;
  }
}
export const nextFromUrl = () => safeNext(new URLSearchParams(window.location.search).get('next'));
export const withNext = (path, next) => (next && next !== AFTER_LOGIN ? `${path}?next=${encodeURIComponent(next)}` : path);

// ---------- Forgot password (demo) ----------
// No email/SMS service exists on a static site, so the OTP is returned to the UI
// and shown on screen. With a real backend, send it by email/SMS and never return it.
const RESET = 'bs_reset';
export const OTP_TTL_MS = 5 * 60 * 1000, RESEND_MS = 60 * 1000, OTP_MAX_TRIES = 5;
const sha = async (s) => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const findUser = (identifier) => {
  const all = read(localStorage, USERS, {}), raw = identifier.trim();
  return { all, u: raw.includes('@') ? Object.values(all).find((x) => x.email === raw.toLowerCase()) : all[localPhone(raw)] };
};

export const getResetState = () => read(sessionStorage, RESET, null);
export const clearReset = () => { try { sessionStorage.removeItem(RESET); } catch {} };

// Create (or resend) a one-time code. Same response whether or not the account exists.
export async function requestOtp(identifier) {
  const raw = identifier.trim();
  if (!raw) return { error: 'Please enter your email or mobile number.' };
  const prev = getResetState(), now = Date.now();
  if (prev && prev.ident === raw.toLowerCase() && now < prev.resendAt) {
    return { error: `Please wait ${Math.ceil((prev.resendAt - now) / 1000)} seconds before requesting a new code.` };
  }
  const { u } = findUser(raw);
  const otp = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
  const id = u ? u.phone : '';
  const state = { ident: raw.toLowerCase(), id, hash: await sha(otp + ':' + id), expiresAt: now + OTP_TTL_MS, resendAt: now + RESEND_MS, tries: 0, verified: false };
  write(sessionStorage, RESET, state);
  return { ok: true, state, demoOtp: u ? otp : undefined };
}

export async function verifyOtp(code) {
  const s = getResetState();
  if (!s) return { error: 'Session expired. Please request a new code.' };
  if (Date.now() > s.expiresAt) return { error: 'This code has expired. Please request a new one.', expired: true };
  if (s.tries >= OTP_MAX_TRIES) return { error: 'Too many wrong attempts. Please request a new code.', expired: true };
  if (!s.id || (await sha(code.trim() + ':' + s.id)) !== s.hash) {
    s.tries += 1; write(sessionStorage, RESET, s);
    return { error: `Incorrect code. ${OTP_MAX_TRIES - s.tries} attempts left.` };
  }
  s.verified = true; s.expiresAt = Date.now() + 10 * 60 * 1000; write(sessionStorage, RESET, s);
  return { ok: true };
}

export async function resetPassword(pass) {
  const s = getResetState();
  if (!s || !s.verified || Date.now() > s.expiresAt) return { error: 'Session expired. Please start again.', expired: true };
  const users = read(localStorage, USERS, {}), u = users[s.id];
  if (!u) return { error: 'Account not found.', expired: true };
  u.salt = newSalt(); u.hash = await hash(pass, u.salt);
  write(localStorage, USERS, users);
  const fails = read(localStorage, FAILS, {}); delete fails[u.email]; delete fails[u.phone]; write(localStorage, FAILS, fails);
  clearReset();
  return { ok: true };
}

// ---------- Profile ----------
// Update name / email / avatar (data URL, '' to remove) of the signed-in user.
export function updateProfile({ name, email, avatar }) {
  const s = read(sessionStorage, SESSION, null);
  if (!s) return { error: 'Please log in again.' };
  const users = read(localStorage, USERS, {}), u = users[s.phone];
  if (!u) return { error: 'Account not found.' };
  if (name !== undefined) {
    if (name.trim().length < 2) return { error: 'Please enter your name.' };
    u.name = name.trim();
  }
  if (email !== undefined) {
    if (!validEmail(email)) return { error: 'Please enter a valid email address.' };
    const em = email.trim().toLowerCase();
    if (Object.values(users).some((x) => x !== u && x.email === em)) return { error: 'This email is already used by another account.' };
    u.email = em;
  }
  if (avatar !== undefined) u.avatar = avatar;
  write(localStorage, USERS, users);
  Object.assign(s, { name: u.name, email: u.email, avatar: u.avatar || '' });
  write(sessionStorage, SESSION, s);
  window.dispatchEvent(new Event('bs-auth'));
  return { user: s };
}

export async function changePassword(oldPass, newPass) {
  const s = read(sessionStorage, SESSION, null);
  if (!s) return { error: 'Please log in again.' };
  const users = read(localStorage, USERS, {}), u = users[s.phone];
  if (!u) return { error: 'Account not found.' };
  if ((await hash(oldPass, u.salt)) !== u.hash) return { error: 'Current password is incorrect.' };
  if (!strongPass(newPass)) return { error: 'New password must be at least 8 characters and include letters and numbers.' };
  u.salt = newSalt(); u.hash = await hash(newPass, u.salt);
  write(localStorage, USERS, users);
  return { ok: true };
}
