import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { investedSince } from '@/lib/investments';
import { money } from '@/lib/format';
import { cn } from '@/lib/cn';

export default function InvestmentCard({ item }) {
  const href = '/investments/' + item.id;
  return (
    <Card as="article" hover className="group overflow-hidden">
      <Link href={href} className="relative block h-[225px] overflow-hidden bg-[#e7eddf] md:h-[205px]">
        <img src={item.image} alt={item.imageAlt} className={cn('size-full transition-transform duration-500 group-hover:scale-105', item.imageClass)} />
        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] text-brand">● {item.status}</span>
        <span className="absolute bottom-4 left-5 rounded bg-white/95 px-3 py-1 text-xs text-brand">{item.category}</span>
      </Link>
      <div className="p-6 md:p-5">
        <h3 className="text-[22px] md:text-xl">
          <Link href={href}>{item.name}</Link>
        </h3>
        <p className="mt-2 text-sm leading-[1.9] text-muted md:min-h-12 md:text-[13px]">{item.description}</p>
        <div className="my-5 grid grid-cols-2">
          <div>
            <small className="mb-1 block text-xs text-muted">Total invested</small>
            <strong className="font-sans text-2xl font-semibold md:text-[22px]">{money(item.amount)}</strong>
          </div>
          <div>
            <small className="mb-1 block text-xs text-muted">Net profit</small>
            <strong className="font-sans text-2xl font-semibold text-brand md:text-[22px]">{money(item.profit)}</strong>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-4 text-xs text-muted">
          <span>Since {investedSince(item)}</span>
          <Link href={href} className="flex items-center gap-1.5 text-brand">
            View details <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
