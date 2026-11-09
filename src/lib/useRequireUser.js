'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { currentUser, withNext } from '@/lib/auth';

// Returns the signed-in user, or redirects to /login and back here afterwards. Stays in sync with profile edits / logout.
export function useRequireUser() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const sync = () => {
      const u = currentUser();
      if (!u) {
        const { pathname, search, hash } = window.location;
        router.replace(withNext('/login', pathname + search + hash));
      } else setUser({ ...u });
    };
    sync();
    window.addEventListener('bs-auth', sync);
    const t = setInterval(sync, 60000);
    return () => {
      window.removeEventListener('bs-auth', sync);
      clearInterval(t);
    };
  }, [router]);
  return user;
}
