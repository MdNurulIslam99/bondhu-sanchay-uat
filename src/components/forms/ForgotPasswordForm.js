'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MailQuestion, ShieldCheck, LockKeyhole, CheckCircle, Timer } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TextField, PasswordField, Alert } from '@/components/ui/Field';
import { requestOtp, verifyOtp, resetPassword, getResetState, clearReset, strongPass, nextFromUrl, withNext } from '@/lib/auth';
import { useNow, mmss } from '@/lib/useNow';

const icons = { request: MailQuestion, otp: ShieldCheck, reset: LockKeyhole, done: CheckCircle };

export default function ForgotPasswordForm() {
  const router = useRouter();
  const now = useNow();
  const [step, setStep] = useState('request');
  const [reset, setReset] = useState(null); // { ident, expiresAt, resendAt }
  const [demoOtp, setDemoOtp] = useState('');
  const [err, setErr] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const [next, setNext] = useState('');
  const Icon = icons[step];

  useEffect(() => setNext(nextFromUrl()), []);

  // Restore an in-progress reset after a page refresh.
  useEffect(() => {
    const s = getResetState();
    if (s && Date.now() < s.expiresAt) {
      setReset(s);
      setStep(s.verified ? 'reset' : 'otp');
    }
  }, []);

  const expired = reset && now > reset.expiresAt;
  const resendIn = reset ? Math.max(0, reset.resendAt - now) : 0;

  async function send(ident, resend) {
    setErr('');
    setInfo('');
    setBusy(true);
    const r = await requestOtp(ident);
    setBusy(false);
    if (r.error) return setErr(r.error);
    setReset(r.state);
    setDemoOtp(r.demoOtp || '');
    setStep('otp');
    setInfo(resend ? 'A new code has been sent.' : 'If an account exists for this email/number, a 6-digit code has been sent.');
  }

  const onRequest = (e) => {
    e.preventDefault();
    send(new FormData(e.currentTarget).get('ident').toString());
  };

  async function onVerify(e) {
    e.preventDefault();
    setErr('');
    setInfo('');
    setBusy(true);
    const r = await verifyOtp(new FormData(e.currentTarget).get('code').toString());
    setBusy(false);
    if (r.error) return setErr(r.error);
    setReset(getResetState());
    setDemoOtp('');
    setStep('reset');
  }

  async function onReset(e) {
    e.preventDefault();
    setErr('');
    const f = new FormData(e.currentTarget);
    const pass = f.get('password').toString();
    if (!strongPass(pass)) return setErr('Password must be at least 8 characters and include letters and numbers.');
    if (pass !== f.get('confirm')) return setErr('The two passwords do not match.');
    setBusy(true);
    const r = await resetPassword(pass);
    setBusy(false);
    if (r.error) {
      setErr(r.error);
      if (r.expired) setStep('request');
      return;
    }
    setStep('done');
  }

  const startOver = () => {
    clearReset();
    setReset(null);
    setDemoOtp('');
    setErr('');
    setInfo('');
    setStep('request');
  };

  return (
    <Container className="grid place-items-center py-7 sm:py-14">
      <Card className="w-full max-w-[460px] p-6 shadow-[0_24px_60px_rgba(22,59,49,0.14)] sm:p-9">
        <span className="mb-4 grid size-[52px] place-items-center rounded-full bg-mint text-brand">
          <Icon />
        </span>

        {step === 'request' && (
          <form onSubmit={onRequest} noValidate>
            <h1 className="text-[25px]">Forgot your password?</h1>
            <p className="mb-6 mt-2.5 text-[13px] leading-relaxed text-muted">Enter your email or mobile number and we will send a 6-digit code to reset it.</p>
            <TextField label="Email or mobile number" name="ident" required maxLength={120} autoComplete="username" placeholder="you@example.com" />
            {err && <Alert role="alert" className="mb-4">{err}</Alert>}
            <Button type="submit" full disabled={busy}>{busy ? 'Please wait…' : 'Send code'}</Button>
          </form>
        )}

        {step === 'otp' && reset && (
          <form onSubmit={onVerify} noValidate>
            <h1 className="text-[25px]">Enter the code</h1>
            <p className="mb-4 mt-2.5 text-[13px] leading-relaxed text-muted">
              We sent a 6-digit code to <strong className="text-ink">{reset.ident}</strong>.
            </p>
            {demoOtp && (
              <Alert tone="success" className="mb-4">
                <strong>Demo mode:</strong> no email service is connected, so your code is <strong className="tracking-widest">{demoOtp}</strong>.
              </Alert>
            )}
            {info && !err && <p className="mb-4 text-[13px] text-brand" role="status">{info}</p>}
            <TextField
              label="6-digit code"
              name="code"
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="••••••"
              className="[&_input]:text-center [&_input]:text-xl [&_input]:tracking-[0.5em]"
            />
            <p className="mb-5 flex items-center gap-1.5 text-[13px] text-muted">
              <Timer size={15} />
              {expired ? <span className="text-[#a22]">Code expired. Please resend.</span> : <>Code expires in <strong className="text-ink">{mmss(reset.expiresAt - now)}</strong></>}
            </p>
            {err && <Alert role="alert" className="mb-4">{err}</Alert>}
            <Button type="submit" full disabled={busy || expired}>{busy ? 'Please wait…' : 'Verify code'}</Button>
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                type="button"
                disabled={resendIn > 0 || busy}
                onClick={() => send(reset.ident, true)}
                className="font-semibold text-brand disabled:font-normal disabled:text-muted"
              >
                {resendIn > 0 ? `Resend code in ${Math.ceil(resendIn / 1000)}s` : 'Resend code'}
              </button>
              <button type="button" onClick={startOver} className="text-muted hover:underline">Change email/number</button>
            </div>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={onReset} noValidate>
            <h1 className="text-[25px]">Set a new password</h1>
            <p className="mb-6 mt-2.5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
              Code verified.
              {reset && (
                <Badge tone="warn" icon={Timer}>
                  Finish within {mmss(reset.expiresAt - now)}
                </Badge>
              )}
            </p>
            <PasswordField label="New password" name="password" required maxLength={128} autoComplete="new-password" placeholder="••••••••" />
            <PasswordField label="Confirm new password" name="confirm" required maxLength={128} autoComplete="new-password" />
            {err && <Alert role="alert" className="mb-4">{err}</Alert>}
            <Button type="submit" full disabled={busy}>{busy ? 'Please wait…' : 'Reset password'}</Button>
          </form>
        )}

        {step === 'done' && (
          <div>
            <h1 className="text-[25px]">Password updated</h1>
            <p className="mb-6 mt-2.5 text-[13px] leading-relaxed text-muted">Your password has been changed. You can now log in with the new password.</p>
            <Button full onClick={() => router.push(withNext('/login', next))}>Go to log in</Button>
          </div>
        )}

        {step !== 'done' && (
          <p className="mt-5 text-center text-sm">
            <Link href={withNext('/login', next)} className="font-semibold text-brand">← Back to log in</Link>
          </p>
        )}
        <small className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <ShieldCheck size={14} /> Demo: no email is sent; the code is shown on screen.
        </small>
      </Card>
    </Container>
  );
}
