'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PiggyBank, Wallet, TrendingUp, Users, CalendarCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Panel from '@/components/ui/Panel';
import StatCard from '@/components/ui/StatCard';
import MonthCalendar from '@/components/calendar/MonthCalendar';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import DonutChart from '@/components/charts/DonutChart';
import DashboardHeader from './DashboardHeader';
import MonthDetail from './MonthDetail';
import DepositHistory from './DepositHistory';
import InvestmentTable from './InvestmentTable';
import MyAccount from './MyAccount';
import { logout, localPhone } from '@/lib/auth';
import { useRequireUser } from '@/lib/useRequireUser';
import { members } from '@/data/members';
import { investments } from '@/data/investments';
import { START_MONTH, LATEST_MONTH, MONTHLY_FEE } from '@/data/payments';
import { memberAccount, monthlySeries, cumulativeSeries, totals, getMonthSummary, memberHistory, shortMonth, parseKey, monthLabel } from '@/lib/payments';
import { money, compactMoney } from '@/lib/format';

const sectorColors = ['stroke-brand', 'stroke-gold', 'stroke-clay'];
const sectorDots = ['bg-brand', 'bg-gold', 'bg-clay'];

// Label helper: show the year under January and the first month.
const axisLabel = (key, i) => ({ label: shortMonth(key), sublabel: i === 0 || parseKey(key).month === 1 ? String(parseKey(key).year) : undefined });

export default function Dashboard() {
  const router = useRouter();
  const user = useRequireUser();
  const [month, setMonth] = useState(LATEST_MONTH);

  const summary = useMemo(() => getMonthSummary(month), [month]);
  const me = user ? members.find((m) => m.phone === localPhone(user.phone)) : null;
  const account = me ? memberAccount(me.id) : null;
const myPaid = account ? account.paidMonths : 0;

  if (!user) return <Loader />;

  const collectionData = monthlySeries.map((m, i) => ({ ...axisLabel(m.key, i), value: m.collected, active: m.key === month }));
  const fundData = cumulativeSeries.map((m, i) => ({ ...axisLabel(m.key, i), value: m.value }));
  const profitData = monthlySeries.map((m, i) => ({ ...axisLabel(m.key, i), value: m.profit, active: m.key === month }));
  const calendarStatus = (key) => (getMonthSummary(key).unpaid === 0 ? 'complete' : 'partial');

  const stats = [
    me
      ? [PiggyBank, 'Your total deposits', money(myPaid * MONTHLY_FEE), `${myPaid} months × ${money(MONTHLY_FEE)}`]
      : [CalendarCheck, 'Monthly contribution', money(MONTHLY_FEE), 'Per member, every month'],
    [Wallet, 'Group total savings', money(totals.collected), `Since ${monthLabel(START_MONTH)}`],
    [TrendingUp, 'Total profit earned', money(totals.profit), 'Across all projects'],
    [Users, 'Active members', String(totals.members), `${summary.paid} paid in ${monthLabel(month)}`],
  ];

  return (
    <Container className="py-8 sm:py-12">
      <DashboardHeader
        user={user}
        memberName={me?.name}
        onLogout={() => {
          logout();
          router.replace('/login');
        }}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([icon, label, value, sub]) => (
          <StatCard key={label} variant="card" icon={icon} label={label} value={value} sub={sub} />
        ))}
      </div>

      {me && <MyAccount member={me} />}

      {/* Calendar + selected month */}
      <div className="mb-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[auto_1fr]">
        <Panel title="Pick a month" subtitle={`Contributions started ${monthLabel(START_MONTH)}. Select any month to see who paid.`} className="lg:w-[380px]">
          <MonthCalendar value={month} onChange={setMonth} min={START_MONTH} max={LATEST_MONTH} size="md" statusOf={calendarStatus} className="mx-auto max-w-none border-0 p-0" />
        </Panel>
        <MonthDetail summary={summary} myMemberId={me?.id} />
      </div>

      {/* Graphs */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Monthly collection" subtitle="Total deposited each month. The selected month is highlighted.">
          <BarChart data={collectionData} ariaLabel="Total deposits collected per month" />
        </Panel>
        <Panel title="Fund growth" subtitle="Cumulative savings plus profit.">
          <LineChart data={fundData} ariaLabel="Cumulative fund value over time" />
        </Panel>
        <Panel title="Monthly profit" subtitle="Net profit collected from projects, after costs.">
          <BarChart data={profitData} ariaLabel="Profit earned per month" />
        </Panel>
        <Panel title="Where the money is" subtitle="Invested capital by sector, and cash in fund.">
          <DonutChart
            size={170}
            ariaLabel="Fund split by sector"
            centerValue={compactMoney(totals.collected + totals.profit)}
            centerLabel="total fund"
            segments={[
              ...investments.map((i, idx) => ({ label: i.category, value: i.amount, display: money(i.amount), className: sectorColors[idx % 3], dotClassName: sectorDots[idx % 3] })),
              { label: 'Cash in fund', value: totals.cash, display: money(totals.cash), className: 'stroke-[#b8c9a6]', dotClassName: 'bg-[#b8c9a6]' },
            ]}
          />
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {me ? <DepositHistory memberId={me.id} /> : <Panel title="Your monthly deposits"><p className="text-sm leading-relaxed text-muted">Your mobile number isn’t in the member list, so personal deposits aren’t shown. Ask a coordinator to add {user.phone}.</p></Panel>}
        <InvestmentTable shareRatio={account ? account.ratio : 1 / totals.members} />
      </div>
    </Container>
  );
}
