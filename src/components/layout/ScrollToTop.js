'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// Floating back-to-top button, shown after scrolling down.
export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-dark"
    >
      <ArrowUp size={20} />
    </button>
  );
}
