'use client';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/Button';
import MyAccount from './MyAccount';
import DepositHistory from './DepositHistory';
import { useRequireUser } from '@/lib/useRequireUser';
import { members, initials, maskPhone } from '@/data/members';
import { memberAccount } from '@/lib/payments';
import { START_MONTH } from '@/data/payments';
import { monthLabel } from '@/lib/payments';

// One member's details: account summary and month-by-month deposit history.
export default function MemberDetail({ memberId }) {
  const user = useRequireUser();
  const member = members.find((m) => m.id === memberId);
  if (!user) return <Loader />;
  if (!member) return <Container className="py-16"><p>Member not found.</p></Container>;

  const a = memberAccount(member.id);
  return (
    <Container className="py-8 sm:py-12">
      <TextLink href="/dashboard/members" className="mb-5">
        <ArrowLeft size={16} /> All members
      </TextLink>
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[18px] bg-[linear-gradient(120deg,#0f5a45,#10302a)] p-5 text-white sm:p-7">
        <Avatar size="lg" text={initials(member.name)} className="bg-white/15 text-white" />
        <div>
          <h1 className="text-[26px] sm:text-3xl">{member.name}</h1>
          <p className="mt-1 text-sm text-[#cfe2da]">Member #{member.sl} · {maskPhone(member.phone)} · Joined {monthLabel(START_MONTH)}</p>
          <div className="mt-3">{a.dueTotal > 0 ? <Badge tone="danger">Due {a.dueMonths.length} month(s)</Badge> : <Badge tone="success">Up to date</Badge>}</div>
        </div>
      </div>
      <MyAccount member={member} title="Account summary" subtitle="Deposits, dues and profit share" />
      <DepositHistory memberId={member.id} title="Monthly deposits" />
    </Container>
  );
}
