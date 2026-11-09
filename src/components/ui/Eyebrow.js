import { cn } from '@/lib/cn';

export default function Eyebrow({ light, className, children }) {
  return (
    <span className={cn('mb-3 block text-[11px] font-bold uppercase tracking-[1.6px] sm:text-xs', light ? 'text-[#c8d6ad]' : 'text-clay', className)}>
      {children}
    </span>
  );
}
