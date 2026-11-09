import { Sprout } from 'lucide-react';
import { cn } from '@/lib/cn';

// Full-area loading state: the brand mark inside a spinning ring.
// Fades in after a short delay, so very quick loads don't flash it.
export default function Loader({ className }) {
  return (
    <div role="status" className={cn('grid min-h-[60vh] animate-fade-in place-items-center', className)}>
      <span aria-hidden className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-mint border-t-gold" />
        <span className="grid h-[46px] w-11 place-items-center rounded-[13px_4px_13px_4px] bg-brand text-white">
          <Sprout size={27} />
        </span>
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
