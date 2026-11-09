import Card from './Card';
import { cn } from '@/lib/cn';

// variant "center": marketing strip. variant "card": dashboard tile.
export default function StatCard({ icon: Icon, value, label, sub, variant = 'center', className }) {
  const icon = (
    <span className="mb-3 inline-flex rounded-xl bg-[#f0f5ed] p-2.5 text-brand">
      <Icon size={22} />
    </span>
  );
  if (variant === 'card') {
    return (
      <Card hover className={cn('flex flex-col items-start p-5 shadow-[0_8px_24px_rgba(22,59,49,0.06)]', className)}>
        {icon}
        <strong className="font-sans text-[26px] font-semibold leading-tight sm:text-[28px]">{value}</strong>
        <span className="mt-1.5 text-sm text-muted">{label}</span>
        {sub && <span className="mt-1 text-xs text-muted">{sub}</span>}
      </Card>
    );
  }
  return (
    <div className={cn('p-2.5 text-center sm:p-5 sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-line', className)}>
      {icon}
      <strong className="block font-sans text-[28px] font-semibold leading-tight sm:text-[31px]">{value}</strong>
      <h3 className="mt-2.5 font-serif text-sm font-semibold sm:text-[15px]">{label}</h3>
      {sub && <p className="mt-1 text-[11px] leading-relaxed text-muted sm:text-xs">{sub}</p>}
    </div>
  );
}
