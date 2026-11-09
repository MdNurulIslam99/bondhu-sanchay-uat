'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, LogIn } from 'lucide-react';
import UserMenu from './UserMenu';
import Brand from './Brand';
import Container from '@/components/ui/Container';
import { buttonClasses } from '@/components/ui/Button';
import { currentUser } from '@/lib/auth';
import { navLinks } from '@/data/site';
import { cn } from '@/lib/cn';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
const authed = !!user;
  const raw = usePathname() || '/';
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw;
  const isActive = (u) => (u === '/' ? path === '/' : path === u || path.startsWith(u + '/'));

  useEffect(() => {
    const sync = () => setUser(currentUser() ? { ...currentUser() } : null);
    sync();
    window.addEventListener('bs-auth', sync);
    return () => window.removeEventListener('bs-auth', sync);
  }, [path]);

  const linkClass = (active) =>
    cn('px-3 py-3 text-base lg:px-0 lg:py-0 lg:text-[15px]', active ? 'font-semibold text-brand' : 'text-[#59685f] hover:text-brand');

  return (
    <header className="sticky top-0 z-30 h-[74px] border-b border-line bg-cream/90 backdrop-blur-md lg:h-[94px]">
      <Container className="flex h-full items-center justify-between gap-2 lg:gap-7">
        <Brand />
        <nav
          aria-label="Main navigation"
          className={cn(
            'absolute left-0 top-full w-full flex-col border-b border-line bg-cream px-4 py-4 shadow-[0_15px_20px_#143b3110] lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none',
            open ? 'flex' : 'hidden',
          )}
        >
          {navLinks.map(([url, label]) => (
            <Link key={url} href={url} onClick={() => setOpen(false)} aria-current={isActive(url) ? 'page' : undefined} className={linkClass(isActive(url))}>
              {label}
            </Link>
          ))}
          <Link
            href={authed ? '/dashboard' : '/login'}
            onClick={() => setOpen(false)}
            className={cn(linkClass(isActive('/dashboard') || isActive('/login')), 'lg:hidden')}
          >
            {authed ? 'Dashboard' : 'Log in'}
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4 lg:ml-0">
          {authed ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link className="hidden items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold text-brand lg:inline-flex" href="/login">
                <LogIn size={16} /> Log in
              </Link>
              <Link className={buttonClasses({ size: 'sm', className: 'px-4' })} href="/signup">
                Sign up <ArrowUpRight size={17} />
              </Link>
            </>
          )}
          <button className="grid size-9 place-items-center rounded-full border border-line bg-white text-brand lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>
    </header>
  );
}
