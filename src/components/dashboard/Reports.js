'use client';
import { useState } from 'react';
import { Download } from 'lucide-react';
import Loader from '@/components/ui/Loader';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Panel from '@/components/ui/Panel';
import DataTable from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { InlineSelect } from '@/components/ui/Field';
import BarChart from '@/components/charts/BarChart';
import { useRequireUser } from '@/lib/useRequireUser';
import { monthlySeries, totals, parseKey, monthLabel, shortMonth } from '@/lib/payments';
import { money } from '@/lib/format';
import { downloadCsv } from '@/lib/csv';

const years = [...new Set(monthlySeries.map((m) => parseKey(m.key).year))];

export default function Reports() {
  const user = useRequireUser();
  const [period, setPeriod] = useState('all');
  if (!user) return <Loader />;

  const selected = period === 'all' ? monthlySeries : monthlySeries.filter((m) => parseKey(m.key).year === +period);
  const sum = (f) => selected.reduce((a, m) => a + f(m), 0);

  function download() {
    downloadCsv(
      'bondhu-sanchay-report.csv',
      ['Month', 'Savings', 'Profit', 'Total'],
      selected.map((m) => [monthLabel(m.key), m.collected, m.profit, m.collected + m.profit]),
    );
  }

  const columns = [
    { key: 'month', header: 'Month', render: (m) => monthLabel(m.key) },
    { key: 'collected', header: 'Member savings', align: 'right', render: (m) => money(m.collected) },
    { key: 'profit', header: 'Profit earned', align: 'right', className: 'text-brand', render: (m) => money(m.profit) },
    { key: 'total', header: 'Total received', align: 'right', render: (m) => money(m.collected + m.profit) },
  ];

  return (
    <>
      <PageHero eyebrow="Trust through transparency" title="A clear account of every taka.">
        Consolidated reports of savings and profit. No personal financial data is published here.
      </PageHero>
      <Section>
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <InlineSelect label="Report period" value={period} onChange={(e) => setPeriod(e.target.value)} className="justify-between">
            <option value="all">All time ({monthLabel(monthlySeries[0].key)} – {monthLabel(monthlySeries.at(-1).key)})</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </InlineSelect>
          <Button onClick={download}>
            <Download size={18} /> Download CSV
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Panel title="Monthly profit chart" subtitle="Net profit collected, after costs">
            <BarChart
              ariaLabel="Profit earned per month"
              data={selected.map((m) => ({ label: shortMonth(m.key), sublabel: parseKey(m.key).month === 1 || m === selected[0] ? String(parseKey(m.key).year) : undefined, value: m.profit }))}
            />
          </Panel>
          <Panel title="Fund summary" subtitle={`As of ${monthLabel(monthlySeries.at(-1).key)}`}>
            {[
              ['Total member savings', totals.collected],
              ['Total profit earned', totals.profit],
              ['Capital invested in projects', totals.invested],
              ['Cash in fund', totals.cash],
            ].map(([l, n]) => (
              <div key={l} className="flex justify-between gap-3 border-b border-line py-4 text-sm">
                <span>{l}</span>
                <strong className="font-sans text-[19px] font-semibold">{money(n)}</strong>
              </div>
            ))}
            <small className="mt-4 block leading-[1.7] text-muted">Cash in fund = savings − capital invested + net profit. Profit is shown after costs; withdrawals are assumed to be zero.</small>
          </Panel>
        </div>

        <Panel title="Month-by-month summary">
          <DataTable
            columns={columns}
            rows={selected}
            rowKey={(m) => m.key}
            maxHeight={460}
            footer={['Total for selected period', money(sum((m) => m.collected)), money(sum((m) => m.profit)), money(sum((m) => m.collected + m.profit))]}
          />
        </Panel>
      </Section>
    </>
  );
}
