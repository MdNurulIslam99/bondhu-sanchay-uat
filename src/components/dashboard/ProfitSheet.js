'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Clock, Download, Landmark, Receipt, TrendingUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Card from '@/components/ui/Card';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import Eyebrow from '@/components/ui/Eyebrow';
import StatCard from '@/components/ui/StatCard';
import DataTable from '@/components/ui/DataTable';
import { Button, TextLink } from '@/components/ui/Button';
import BarChart from '@/components/charts/BarChart';
import { useRequireUser } from '@/lib/useRequireUser';
import { PROFIT_SHEET_THROUGH } from '@/data/investments';
import { ledgers, ledgerTotals as t, ledgerMonths, netForMonth, costEntries, formatDate } from '@/lib/investments';
import { monthLabel, shortMonth } from '@/lib/payments';
import { money } from '@/lib/format';
import { downloadCsv } from '@/lib/csv';

const through = monthLabel(PROFIT_SHEET_THROUGH);

function downloadLedger() {
  const rows = ledgers.flatMap((l) =>
    l.months.map((m) => [l.name, l.partner, monthLabel(m.key), m.expected, m.collected ? m.received + m.cost : 0, m.cost, m.received, m.collected ? 'Collected' : 'Not collected']),
  );
  downloadCsv('bondhu-sanchay-profit-sheet.csv', ['Project', 'Partner', 'Month', 'Monthly profit', 'Gross collected', 'Cost', 'Net received', 'Status'], rows);
}

const SwipeHint = () => <p className="mt-2 text-xs text-muted lg:hidden">Swipe the table sideways to see every column →</p>;

// One project's result for one month in the month-by-month grid.
function MonthCell({ month }) {
  if (!month) return <span className="text-[#a3ada6]">—</span>;
  if (!month.collected) return <Badge tone="warn" icon={Clock}>Due {money(month.expected)}</Badge>;
  return (
    <>
      <span className="font-semibold">{money(month.received)}</span>
      {month.cost > 0 && <small className="block text-[11px] text-[#a4492a]">after {money(month.cost)} cost</small>}
    </>
  );
}

const summaryColumns = [
  {
    key: 'name',
    header: 'Project',
    render: (l) => (
      <>
        <Link href={`/investments/${l.id}`} className="font-semibold hover:text-brand hover:underline">{l.name}</Link>
        <small className="block text-xs text-muted">Partner: {l.partner}</small>
      </>
    ),
  },
  { key: 'amount', header: 'Invested', align: 'right', render: (l) => money(l.amount) },
  { key: 'monthlyProfit', header: 'Profit / month', align: 'right', render: (l) => money(l.monthlyProfit) },
  { key: 'months', header: 'Months run', align: 'right', render: (l) => l.monthsRun },
  { key: 'collectedMonths', header: 'Months collected', align: 'right', render: (l) => l.monthsCollected },
  { key: 'gross', header: 'Gross profit', align: 'right', render: (l) => money(l.gross) },
  { key: 'cost', header: 'Cost', align: 'right', render: (l) => (l.cost ? money(l.cost) : '—') },
  { key: 'net', header: 'Net profit', align: 'right', className: 'font-semibold text-brand', render: (l) => money(l.profit) },
  { key: 'pending', header: 'Not collected', align: 'right', render: (l) => (l.pending ? money(l.pending) : '—') },
];

const monthColumns = [
  { key: 'name', header: 'Project', className: 'font-semibold' },
  ...ledgerMonths.map((key) => ({
    key,
    header: shortMonth(key),
    align: 'right',
    render: (l) => <MonthCell month={l.months.find((m) => m.key === key)} />,
  })),
];

function ProjectCard({ ledger: l }) {
  const upcoming = l.tranches.filter((x) => x.firstMonth > PROFIT_SHEET_THROUGH);
  return (
    <Card as="article" className="flex flex-col overflow-hidden shadow-[0_8px_24px_rgba(22,59,49,0.05)]">
      <img src={l.image} alt={l.imageAlt} className={`h-[170px] w-full ${l.imageClass ?? ''}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl">{l.name}</h3>
            <p className="mt-1 text-xs text-muted">{l.category} · Partner: {l.partner}</p>
          </div>
          <Badge tone="success">{l.status}</Badge>
        </div>
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Capital given to {l.name}</caption>
          <thead className="text-xs text-muted">
            <tr>
              <th scope="col" className="pb-2 text-left font-medium">Invest date</th>
              <th scope="col" className="pb-2 text-right font-medium">Amount</th>
              <th scope="col" className="pb-2 text-right font-medium">Profit / month</th>
            </tr>
          </thead>
          <tbody>
            {l.tranches.map((x) => (
              <tr key={x.date} className="border-t border-line">
                <td className="py-2 whitespace-nowrap">{formatDate(x.date)}</td>
                <td className="py-2 text-right">{money(x.amount)}</td>
                <td className="py-2 text-right">{money(x.monthlyProfit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {upcoming.map((x) => (
          <p key={x.date} className="mt-1 text-xs leading-relaxed text-muted">
            The {formatDate(x.date)} amount earns from {monthLabel(x.firstMonth)}.
          </p>
        ))}
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
          <div>
            <dt className="text-xs text-muted">Net profit</dt>
            <dd className="mt-0.5 text-lg font-semibold text-brand">{money(l.profit)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Monthly return</dt>
            <dd className="mt-0.5 text-lg font-semibold">{((l.monthlyProfit / l.amount) * 100).toFixed(1)}%</dd>
          </div>
        </dl>
        <TextLink href={`/investments/${l.id}`} className="mt-auto pt-4">
          View project <ArrowUpRight size={16} />
        </TextLink>
      </div>
    </Card>
  );
}

// Signed-in view of the group's investment sheet: capital, profit, costs and what is still to come in.
export default function ProfitSheet() {
  const user = useRequireUser();
  if (!user) return <Loader />;

  const behind = ledgers.filter((l) => l.pending > 0).length;
  const stats = [
    [Landmark, 'Total invested', money(t.invested), `In ${ledgers.length} projects`],
    [TrendingUp, 'Net profit', money(t.net), 'Collected, after costs'],
    [Receipt, 'Total costs', money(t.cost), `${costEntries.length} ${costEntries.length === 1 ? 'cost' : 'costs'} recorded`],
    [Clock, 'Not collected yet', money(t.pending), `${behind} ${behind === 1 ? 'project' : 'projects'} behind`],
  ];

  return (
    <Container className="py-8 sm:py-12">
      <TextLink href="/dashboard" className="mb-5">
        <ArrowLeft size={16} /> Dashboard
      </TextLink>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-5 rounded-[18px] bg-[linear-gradient(120deg,#0f5a45,#10302a)] px-5 py-6 text-white sm:px-8 sm:py-7">
        <div>
          <Eyebrow className="!mb-1.5 text-gold">Investment accounts</Eyebrow>
          <h1 className="text-[27px] sm:text-4xl">Profit &amp; cost sheet</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-[#cfe2da] sm:text-sm">Figures from the 2026 profit sheet, closed through {through}.</p>
        </div>
        <Button variant="light" size="sm" onClick={downloadLedger}>
          <Download size={16} /> Download CSV
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(([icon, label, value, sub]) => (
          <StatCard key={label} variant="card" icon={icon} label={label} value={value} sub={sub} />
        ))}
      </div>

      <Panel title="Project summary" subtitle={`Capital, profit and cost for each project through ${through}.`} className="mb-6">
        <DataTable
          columns={summaryColumns}
          rows={ledgers}
          rowKey={(l) => l.id}
          footer={['Total', money(t.invested), money(t.monthlyProfit), '', '', money(t.gross), money(t.cost), money(t.net), money(t.pending)]}
        />
        <SwipeHint />
      </Panel>

      <Panel title="Month by month" subtitle="Net profit received from each project in 2026." className="mb-6">
        <DataTable
          columns={monthColumns}
          rows={ledgers}
          rowKey={(l) => l.id}
          footer={['Net received', ...ledgerMonths.map((key) => money(netForMonth(key)))]}
        />
        <SwipeHint />
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <li className="flex items-center gap-1.5"><Check size={14} className="text-brand" /> Amount shown: profit collected</li>
          <li className="flex items-center gap-1.5"><Clock size={14} className="text-[#8a6414]" /> Due: month closed with no collection in the sheet</li>
          <li>— Project had not started earning</li>
        </ul>
      </Panel>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Net profit by month" subtitle="All projects together. The table above has the same figures.">
          <BarChart ariaLabel="Net profit received per month" data={ledgerMonths.map((key) => ({ label: shortMonth(key), value: netForMonth(key) }))} />
        </Panel>
        <Panel title="From gross profit to net" subtitle={`Through ${through}`}>
          <div className="flex justify-between gap-3 border-b border-line py-3 text-sm">
            <span>Gross profit collected</span>
            <strong className="font-semibold">{money(t.gross)}</strong>
          </div>
          {costEntries.map((c) => (
            <div key={c.project + c.key} className="flex justify-between gap-3 border-b border-line py-3 text-sm">
              <span>
                {c.note}
                <small className="mt-0.5 block text-xs text-muted">{c.project} · {monthLabel(c.key)}</small>
              </span>
              <strong className="font-semibold text-[#a4492a]">−{money(c.amount)}</strong>
            </div>
          ))}
          <div className="flex justify-between gap-3 border-b border-line py-3 text-sm">
            <span className="font-semibold">Net profit</span>
            <strong className="text-lg font-semibold text-brand">{money(t.net)}</strong>
          </div>
          <div className="flex justify-between gap-3 py-3 text-sm">
            <span>
              Not collected yet
              <small className="mt-0.5 block text-xs text-muted">{money(t.expected)} due so far − {money(t.gross)} gross collected</small>
            </span>
            <strong className="font-semibold">{money(t.pending)}</strong>
          </div>
        </Panel>
      </div>

      <h2 className="mb-4 text-2xl">Projects</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ledgers.map((l) => (
          <ProjectCard key={l.id} ledger={l} />
        ))}
      </div>
    </Container>
  );
}
