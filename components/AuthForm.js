'use client';
import {useState,useEffect} from 'react';import Link from 'next/link';import {useRouter} from 'next/navigation';import {KeyRound,UserRoundPlus,Sprout,Check,Eye,EyeOff,ShieldCheck} from 'lucide-react';
import {login,signup,validPhone,validEmail,strongPass,currentUser} from '@/lib/auth';
export default function AuthForm({mode}){
  const isSignup=mode==='signup',router=useRouter();
  const [err,setErr]=useState(''),[busy,setBusy]=useState(false),[show,setShow]=useState(false);
  useEffect(()=>{if(currentUser())router.replace('/dashboard')},[router]);
  async function submit(e){
    e.preventDefault();setErr('');const f=new FormData(e.currentTarget),name=(f.get('name')||'').toString(),phone=(f.get('phone')||'').toString(),email=(f.get('email')||'').toString(),ident=(f.get('ident')||'').toString(),pass=f.get('password').toString();
    if(isSignup&&!validEmail(email))return setErr('Please enter a valid email address.');
    if(isSignup&&!validPhone(phone))return setErr('Please enter a valid mobile number (01XXXXXXXXX).');
    if(!isSignup&&!ident.trim())return setErr('Please enter your email or mobile number.');
    if(isSignup){if(name.trim().length<2)return setErr('Please enter your name.');if(!strongPass(pass))return setErr('Password must be at least 8 characters and include letters and numbers.');if(pass!==f.get('confirm'))return setErr('The two passwords do not match.')}
    setBusy(true);const r=isSignup?await signup(name,email,phone,pass):await login(ident,pass);setBusy(false);
    if(r.error)return setErr(r.error);window.dispatchEvent(new Event('bs-auth'));router.push('/dashboard');
  }
  return <section className="container auth-wrap"><div className="auth-shell"><aside className="auth-side"><Sprout size={34}/><h3>Bondhu Sanchay</h3><p>Small savings, a big tomorrow.</p><ul><li><Check size={16}/> Transparent monthly accounts</li><li><Check size={16}/> Full investment details</li><li><Check size={16}/> Member deposit lists</li></ul></aside><form className="form-panel auth-card" onSubmit={submit} noValidate>
    <span className="auth-icon">{isSignup?<UserRoundPlus/>:<KeyRound/>}</span>
    <h2>{isSignup?'Create a new account':'Sign in to your account'}</h2>
    <p>{isSignup?'Sign up to see the member dashboard.':'Log in to see your savings and investment accounts.'}</p>
    {isSignup&&<label>Your name<input name="name" required maxLength={80} autoComplete="name" placeholder="Full name"/></label>}
    {isSignup?<><label>Email<input name="email" required type="email" inputMode="email" maxLength={120} autoComplete="email" placeholder="you@example.com"/></label>
    <label>Mobile number<input name="phone" required type="tel" inputMode="tel" maxLength={20} autoComplete="tel" placeholder="01XXXXXXXXX"/></label></>:<label>Email or mobile number<input name="ident" required maxLength={120} autoComplete="username" placeholder="you@example.com"/></label>}
    <label>Password<span className="pass-field"><input name="password" required type={show?'text':'password'} maxLength={128} autoComplete={isSignup?'new-password':'current-password'} placeholder="••••••••"/><button type="button" aria-label={show?'Hide password':'Show password'} onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></span></label>
    {isSignup&&<label>Confirm password<input name="confirm" required type={show?'text':'password'} maxLength={128} autoComplete="new-password"/></label>}
    {err&&<div className="auth-error" role="alert">{err}</div>}
    <button className="button" disabled={busy}>{busy?'Please wait…':isSignup?'Sign up':'Log in'}</button>
    <p className="auth-switch">{isSignup?<>Already have an account? <Link href="/login">Log in</Link></>:<>New member? <Link href="/signup">Sign up</Link></>}</p>
    <small className="auth-note"><ShieldCheck size={14}/> Demo: data is stored only in your browser; passwords are hashed.</small>
  </form></div></section>}
