'use client';
import {useState,useEffect} from 'react';import Link from 'next/link';import {usePathname} from 'next/navigation';import {Menu,X,ArrowUpRight,LayoutDashboard,LogIn} from 'lucide-react';import Brand from './Brand';import {currentUser} from '@/lib/auth';
const links=[['/','Home'],['/about','About'],['/investments','Investments'],['/members','Members'],['/reports','Reports'],['/faq','FAQ']];
export default function Header(){const [open,setOpen]=useState(false);const [authed,setAuthed]=useState(false);const raw=usePathname()||'/',path=raw.length>1?raw.replace(/\/+$/,''):raw;const isActive=u=>u==='/'?path==='/':path===u||path.startsWith(u+'/');
useEffect(()=>{const sync=()=>setAuthed(!!currentUser());sync();window.addEventListener('bs-auth',sync);return()=>window.removeEventListener('bs-auth',sync)},[path]);
return <header className="header"><div className="container nav"><Brand/><nav className={'nav-links '+(open?'open':'')} aria-label="Main navigation">{links.map(([url,label])=><Link key={url} href={url} onClick={()=>setOpen(false)} aria-current={isActive(url)?'page':undefined} className={isActive(url)?'active':''}>{label}</Link>)}
<Link className="nav-auth-mobile" href={authed?'/dashboard':'/login'} onClick={()=>setOpen(false)}>{authed?'Dashboard':'Log in'}</Link></nav>
{authed?<Link className="button nav-cta" href="/dashboard"><LayoutDashboard size={17}/> Dashboard</Link>:<><Link className="nav-login" href="/login"><LogIn size={16}/> Log in</Link><Link className="button nav-cta" href="/signup">Sign up <ArrowUpRight size={17}/></Link></>}
<button className="menu-button" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
