'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import StatCard from '@/components/ui/StatCard';
import Eyebrow from '@/components/ui/Eyebrow';
import { Users, Wallet, AlertTriangle } from 'lucide-react';
import { useRequireUser } from '@/lib/useRequireUser';
import { members, initials, maskPhone } from '@/data/members';
import { memberAccount, totals } from '@/lib/payments';
import { money } from '@/lib/format';

// Signed-in view of every member with their deposit status. Each row opens the member's details.
export default function MemberDirectory() {
  const user = useRequireUser();
  const [q, setQ] = useState('');
  if (!user) return <Loader />;

  const rows = members.map((m) => ({ m, a: memberAccount(m.id) }));
  const shown = rows.filter(({ m }) => m.name.toLowerCase().includes(q.trim().toLowerCase()));
  const dueMembers = rows.filter(({ a }) => a.dueTotal > 0).length;
  const dueTotal = rows.reduce((s, { a }) => s + a.dueTotal, 0);

  return (
    <Container className="py-8 sm:py-12">
      <Eyebrow>Member directory</Eyebrow>
      <h1 className="text-[29px] md:text-4xl">All members</h1>
      <p className="mb-6 mt-2 text-sm text-muted">Tap a member to see their full deposit details.</p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard variant="card" icon={Users} label="Members" value={String(members.length)} />
        <StatCard variant="card" icon={Wallet} label="Total deposited" value={money(totals.collected)} />
        <StatCard variant="card" icon={AlertTriangle} label="Total due" value={money(dueTotal)} sub={`${dueMembers} member${dueMembers === 1 ? '' : 's'} with dues`} />
      </div>

      <label className="relative mb-5 block max-w-sm">
        <span className="sr-only">Search members</span>
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" className="w-full rounded-full border border-[#dce3d9] bg-white py-3 pl-10 pr-4 text-sm" />
      </label>

      <div className="grid grid-cols-1 gap-3">
        {shown.map(({ m, a }, i) => (
          <Link key={m.id} href={`/dashboard/members/${m.id}`}>
            <Card hover className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
              <Avatar size="sm" tone={i} text={initials(m.name)} className="!size-11" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{m.name}</p>
                <p className="text-xs text-muted">Member #{m.sl} · {maskPhone(m.phone)}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-semibold">{money(a.paidTotal)}</p>
                <p className="text-xs text-muted">{a.paidMonths} months paid</p>
              </div>
              {a.dueTotal > 0 ? <Badge tone="danger">Due {money(a.dueTotal)}</Badge> : <Badge tone="success">Up to date</Badge>}
              <ChevronRight size={18} className="shrink-0 text-muted" />
            </Card>
          </Link>
        ))}
        {shown.length === 0 && <p className="text-sm text-muted">No member matches “{q}”.</p>}
      </div>
    </Container>
  );
}
