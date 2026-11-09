import { Check, Clock, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const tones = {
  neutral: 'bg-[#edf2e8] text-[#627559]',
  success: 'bg-mint text-brand',
  warn: 'bg-[#fbf1dc] text-[#8a6414]',
  danger: 'bg-[#fdeeee] text-[#a22]',
};

export default function Badge({ tone = 'neutral', icon: Icon, className, children }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', tones[tone], className)}>
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}

// Payment status -> badge.
const statusMap = {
  paid: ['success', Check, 'Paid'],
  pending: ['warn', Clock, 'Pending'],
  missed: ['danger', X, 'Not paid'],
  none: ['neutral', null, '—'],
};
export function StatusBadge({ status, labels }) {
  const [tone, icon, label] = statusMap[status] || statusMap.none;
  return (
    <Badge tone={tone} icon={icon}>
      {labels?.[status] ?? label}
    </Badge>
  );
}
