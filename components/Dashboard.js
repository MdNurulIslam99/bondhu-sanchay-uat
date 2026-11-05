'use client';
import {useState,useEffect} from 'react';import {useRouter} from 'next/navigation';import {LogOut,Wallet,TrendingUp,PiggyBank,Users,Check,Clock} from 'lucide-react';
import {currentUser,logout} from '@/lib/auth';import {investments,money} from '@/lib/data';
const MONTHS=['June 2026','July 2026','August 2026','September 2026','October 2026','November 2026'];
const FEE=500,TOTAL_MEMBERS=48;
const OTHERS=['Arif Rahman','Sabina Akter','Tanvir Hasan','Nusrat Jahan','Rashed Karim','Mahia Islam','Farhan Ahmed','Jannatul Ferdous'];
// Deterministic demo data: in the latest month some members are still pending.
const paid=(mi,i)=>mi<MONTHS.length-1||i%3!==0;
export default function Dashboard(){
  const router=useRouter(),[user,setUser]=useState(null),[month,setMonth]=useState(MONTHS.length-1);
  useEffect(()=>{const u=currentUser();if(!u)router.replace('/login');else setUser(u);
    const t=setInterval(()=>{if(!currentUser())router.replace('/login')},60000);return()=>clearInterval(t)},[router]);
  if(!user)return <section className="container section"><p>Loading…</p></section>;
  const saved=MONTHS.length*FEE,pool=investments.reduce((a,b)=>a+b.amount,0),profit=investments.reduce((a,b)=>a+b.profit,0),share=1/TOTAL_MEMBERS;
  const rows=[...OTHERS.map((n,i)=>({n,ok:paid(month,i)})),{n:user.name+' (you)',ok:true,me:true}];
  const stat=[[PiggyBank,'Your total deposits',money(saved)],[Wallet,'Group total savings',money(432000)],[TrendingUp,'Your profit share (estimate)',money(Math.round(profit*share))],[Users,'Active members',TOTAL_MEMBERS.toLocaleString('en-US')]];
  return <div className="container section dash">
    <div className="dash-head"><div><span className="eyebrow">Member dashboard</span><h2>Welcome, {user.name}</h2><p className="muted">{user.email&&<>Email: {user.email} · </>}Mobile: {user.phone} · All data is sample (demo)</p></div>
      <button className="button secondary" onClick={()=>{logout();router.replace('/login')}}><LogOut size={17}/> Log out</button></div>
    <div className="dash-stats">{stat.map(([I,l,v])=><div className="stat" key={l}><span className="stat-icon"><I size={22}/></span><strong>{v}</strong><h3>{l}</h3></div>)}</div>
    <div className="dash-cols">
      <div className="panel"><h3>Your monthly deposits</h3><div className="table-wrap"><table><thead><tr><th>Month</th><th>Amount</th><th>Status</th></tr></thead><tbody>{MONTHS.map(m=><tr key={m}><td>{m}</td><td>{money(FEE)}</td><td><span className="pill ok"><Check size={13}/> Deposited</span></td></tr>)}</tbody></table></div></div>
      <div className="panel"><h3>Who has deposited what</h3><label className="inline-select">Select month<select value={month} onChange={e=>setMonth(+e.target.value)}>{MONTHS.map((m,i)=><option key={m} value={i}>{m}</option>)}</select></label>
        <div className="table-wrap"><table><thead><tr><th>Member</th><th>Amount</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r.n} className={r.me?'me':''}><td>{r.n}</td><td>{money(r.ok?FEE:0)}</td><td>{r.ok?<span className="pill ok"><Check size={13}/> Paid</span>:<span className="pill wait"><Clock size={13}/> Pending</span>}</td></tr>)}</tbody></table></div>
        <small className="muted">Nine sample members are shown.</small></div>
    </div>
    <div className="panel"><h3>Where our savings are invested</h3><p className="muted">Total invested {money(pool)} · Total profit {money(profit)}</p>
      <div className="table-wrap"><table><thead><tr><th>Project</th><th>Sector</th><th>Invested</th><th>Profit</th><th>Your share</th><th>Status</th></tr></thead><tbody>{investments.map(i=><tr key={i.id}><td>{i.name}</td><td>{i.category}</td><td>{money(i.amount)}</td><td>{money(i.profit)}</td><td>{money(Math.round(i.amount*share))}</td><td>{i.status}</td></tr>)}</tbody></table></div>
      <small className="muted">Investments can bring profit or loss; profit is not guaranteed.</small></div>
  </div>}
