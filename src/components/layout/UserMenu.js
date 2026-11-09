'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LayoutDashboard, Users, UserRound, LogOut, ReceiptText } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { logout } from '@/lib/auth';

const items = [
  ['/dashboard', LayoutDashboard, 'Dashboard'],
  ['/dashboard/profit', ReceiptText, 'Profit & cost sheet'],
  ['/dashboard/members', Users, 'All members'],
  ['/profile', UserRound, 'My profile'],
];

// Navbar account menu: photo (or first letter) + first name, with links and Log out.
export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const letter = (user.name || '?').trim()[0].toUpperCase();
  const first = user.name.trim().split(' ')[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-line bg-white p-0.5 transition hover:border-brand sm:py-1 sm:pl-1 sm:pr-3"
      >
        <Avatar size="sm" text={letter} src={user.avatar} />
        <span className="hidden max-w-[110px] truncate text-sm font-medium sm:block">{first}</span>
        <ChevronDown size={16} className={`hidden sm:block ${open ? 'rotate-180 transition' : 'transition'}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-12px_rgba(16,48,42,0.3)]">
          <div className="flex items-center gap-3 border-b border-line px-3 pb-3 pt-2">
            <Avatar size="sm" text={letter} src={user.avatar} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email || user.phone}</p>
            </div>
          </div>
          <div className="py-1.5">
            {items.map(([href, Icon, label]) => (
              <Link key={href} href={href} role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-mint">
                <Icon size={17} className="text-brand" /> {label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
              router.replace('/');
            }}
            className="flex w-full items-center gap-3 rounded-lg border-t border-line px-3 py-2.5 text-sm text-[#a22] hover:bg-[#fdeeee]"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
