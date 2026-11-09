'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, UserRoundPlus, Sprout, Check, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TextField, PasswordField, CheckboxField, Alert } from '@/components/ui/Field';
import { login, signup, validPhone, validEmail, strongPass, currentUser, nextFromUrl, withNext } from '@/lib/auth';

const perks = ['Transparent monthly accounts', 'Full investment details', 'Member deposit calendar'];

export default function AuthForm({ mode }) {
  const isSignup = mode === 'signup';
  const router = useRouter();
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [next, setNext] = useState('');

  useEffect(() => {
    const target = nextFromUrl();
    if (currentUser()) router.replace(target);
    else setNext(target);
  }, [router]);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    const f = new FormData(e.currentTarget);
    const get = (k) => (f.get(k) || '').toString();
    const name = get('name'), phone = get('phone'), email = get('email'), ident = get('ident'), pass = get('password');
    if (isSignup) {
      if (name.trim().length < 2) return setErr('Please enter your name.');
      if (!validEmail(email)) return setErr('Please enter a valid email address.');
      if (!validPhone(phone)) return setErr('Please enter a valid mobile number (01XXXXXXXXX).');
      if (!strongPass(pass)) return setErr('Password must be at least 8 characters and include letters and numbers.');
      if (pass !== get('confirm')) return setErr('The two passwords do not match.');
      if (!f.get('agree')) return setErr('Please agree to the Terms & Conditions and Privacy Policy.');
    } else if (!ident.trim()) return setErr('Please enter your email or mobile number.');
    setBusy(true);
    const r = isSignup ? await signup(name, email, phone, pass) : await login(ident, pass);
    setBusy(false);
    if (r.error) return setErr(r.error);
    window.dispatchEvent(new Event('bs-auth'));
    // replace, so the Back button doesn't return to the login form.
    router.replace(nextFromUrl());
  }

  return (
    <Container className="grid place-items-center py-7 sm:py-14">
      <div className="grid w-full max-w-[900px] overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_24px_60px_rgba(22,59,49,0.14)] md:grid-cols-[0.85fr_1.15fr]">
        <aside className="flex flex-col justify-center gap-3.5 bg-[linear-gradient(160deg,#0f5a45,#10302a)] px-6 py-6 text-white md:px-8 md:py-11">
          <Sprout size={34} className="text-gold" />
          <h3 className="text-xl">Bondhu Sanchay</h3>
          <p className="leading-[1.7] text-[#d6e6df]">Small savings, a big tomorrow.</p>
          <ul className="mt-3.5 hidden gap-3 text-[15px] md:grid">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <Check size={16} className="text-gold" /> {p}
              </li>
            ))}
          </ul>
        </aside>

        <form onSubmit={submit} noValidate className="px-5 py-7 sm:px-9 sm:py-11">
          <span className="mb-4 grid size-[52px] place-items-center rounded-full bg-mint text-brand">{isSignup ? <UserRoundPlus /> : <KeyRound />}</span>
          <h2 className="text-[25px] md:text-[27px]">{isSignup ? 'Create a new account' : 'Sign in to your account'}</h2>
          <p className="mb-6 mt-2.5 text-[13px] text-muted">{isSignup ? 'Sign up to see the member dashboard.' : 'Log in to see your savings and investment accounts.'}</p>

          {isSignup && <TextField label="Your name" name="name" required maxLength={80} autoComplete="name" placeholder="Full name" />}
          {isSignup ? (
            <>
              <TextField label="Email" name="email" required type="email" inputMode="email" maxLength={120} autoComplete="email" placeholder="you@example.com" />
              <TextField label="Mobile number" name="phone" required type="tel" inputMode="tel" maxLength={20} autoComplete="tel" placeholder="01XXXXXXXXX" />
            </>
          ) : (
            <TextField label="Email or mobile number" name="ident" required maxLength={120} autoComplete="username" placeholder="you@example.com" />
          )}
          <PasswordField label="Password" name="password" required maxLength={128} autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="••••••••" />
          {!isSignup && (
            <p className="-mt-2 mb-5 text-right text-[13px]">
              <Link href={withNext('/forgot-password', next)} className="font-semibold text-brand">Forgot password?</Link>
            </p>
          )}
          {isSignup && <PasswordField label="Confirm password" name="confirm" required maxLength={128} autoComplete="new-password" />}
          {isSignup && (
            <CheckboxField name="agree" required>
              I agree to the <Link href="/terms-and-conditions" className="text-brand underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-brand underline">Privacy Policy</Link>.
            </CheckboxField>
          )}
          {err && (
            <Alert role="alert" className="mb-4">
              {err}
            </Alert>
          )}
          <Button type="submit" full disabled={busy}>
            {busy ? 'Please wait…' : isSignup ? 'Sign up' : 'Log in'}
          </Button>
          <p className="mt-4 text-center text-sm">
            {isSignup ? (
              <>Already have an account? <Link href={withNext('/login', next)} className="font-semibold text-brand">Log in</Link></>
            ) : (
              <>New member? <Link href={withNext('/signup', next)} className="font-semibold text-brand">Sign up</Link></>
            )}
          </p>
          <small className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
            <ShieldCheck size={14} /> Demo: data is stored only in your browser; passwords are hashed.
          </small>
        </form>
      </div>
    </Container>
  );
}
