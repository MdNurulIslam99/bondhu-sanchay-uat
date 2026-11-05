// Demo-only client-side auth. A static site has no server, so real security
// (server-side sessions, rate limiting, DB) needs a backend before going live.
const USERS = 'bs_users', SESSION = 'bs_session', FAILS = 'bs_fails';
const IDLE_MS = 30 * 60 * 1000, MAX_FAILS = 5, LOCK_MS = 5 * 60 * 1000;
const enc = new TextEncoder();
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const read = (s, k, d) => { try { return JSON.parse(s.getItem(k)) ?? d; } catch { return d; } };
const write = (s, k, v) => { try { s.setItem(k, JSON.stringify(v)); } catch {} };

export const normPhone = (p) => p.replace(/[^0-9০-৯+]/g, '').replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
export const validPhone = (p) => /^(?:\+?88)?01[3-9]\d{8}$/.test(normPhone(p));
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim()) && e.length <= 120;
export const strongPass = (p) => p.length >= 8 && /[a-z]/i.test(p) && /\d/.test(p);

async function hash(pass, saltHex) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveBits']);
  const salt = Uint8Array.from(saltHex.match(/../g).map((h) => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' }, key, 256));
}
const newSalt = () => hex(crypto.getRandomValues(new Uint8Array(16)));

export async function signup(name, email, phone, pass) {
  const users = read(localStorage, USERS, {}), id = normPhone(phone), em = email.trim().toLowerCase();
  if (users[id] || Object.values(users).some((x) => x.email === em)) return { error: 'An account with this email or number already exists.' };
  const salt = newSalt();
  users[id] = { name: name.trim(), email: em, phone: id, salt, hash: await hash(pass, salt), joined: Date.now() };
  write(localStorage, USERS, users);
  return startSession(users[id]);
}

// identifier = email or mobile number
export async function login(identifier, pass) {
  const all = read(localStorage, USERS, {}), raw = identifier.trim();
  const u = raw.includes('@') ? Object.values(all).find((x) => x.email === raw.toLowerCase()) : all[normPhone(raw)];
  const id = raw.includes('@') ? raw.toLowerCase() : normPhone(raw), fails = read(localStorage, FAILS, {}), f = fails[id] || { n: 0, until: 0 };
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
  const s = { name: u.name, email: u.email, phone: u.phone, joined: u.joined, token: newSalt(), last: Date.now() };
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
