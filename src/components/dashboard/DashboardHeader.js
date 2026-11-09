import { LogOut, ReceiptText, Users, UserRound } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { Button, ButtonLink } from '@/components/ui/Button';

export default function DashboardHeader({ user, memberName, onLogout }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-5 rounded-[18px] bg-[linear-gradient(120deg,#0f5a45,#10302a)] px-5 py-6 text-white sm:px-8 sm:py-7">
      <div>
        <Eyebrow className="!mb-1.5 text-gold">Member dashboard</Eyebrow>
        <h1 className="text-[27px] sm:text-4xl">Welcome, {user.name}</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[#cfe2da] sm:text-sm">
          {user.email && <>Email: {user.email} · </>}Mobile: {user.phone}
          {memberName ? <> · Matched member: {memberName}</> : <> · Not in the member list</>}
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        <ButtonLink href="/dashboard/profit" variant="light" size="sm">
          <ReceiptText size={16} /> Profit &amp; cost
        </ButtonLink>
        <ButtonLink href="/dashboard/members" variant="light" size="sm">
          <Users size={16} /> All members
        </ButtonLink>
        <ButtonLink href="/profile" variant="light" size="sm">
          <UserRound size={16} /> My profile
        </ButtonLink>
        <Button variant="light" size="sm" onClick={onLogout}>
          <LogOut size={16} /> Log out
        </Button>
      </div>
    </div>
  );
}
