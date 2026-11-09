import { Download } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { downloadCsv } from '@/lib/csv';
import DataTable from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/Badge';
import DonutChart from '@/components/charts/DonutChart';
import { monthLabel } from '@/lib/payments';
import { money } from '@/lib/format';

const columns = [
  { key: 'sl', header: 'Sl', render: (r) => r.member.sl },
  { key: 'name', header: 'Member', render: (r) => r.member.name },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => money(r.amount) },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

// Who paid in the selected month: donut + member table.
export default function MonthDetail({ summary, myMemberId }) {
  const exportCsv = () =>
    downloadCsv(
      `deposits-${summary.key}.csv`,
      ['Sl', 'Member', 'Amount', 'Status'],
      summary.rows.map((r) => [r.member.sl, r.member.name, r.amount, r.status === 'paid' ? 'Paid' : 'Not paid']),
    );
  return (
    <Panel
      action={
        <Button size="sm" variant="secondary" onClick={exportCsv}>
          <Download size={15} /> CSV
        </Button>
      }
title={`Deposits — ${monthLabel(summary.key)}`} subtitle="Paid = ৳500 recorded in the collection sheet. Empty = Not paid.">
      <DonutChart
        size={150}
        ariaLabel={`${summary.paid} of ${summary.rows.length} members paid`}
        centerValue={`${summary.paid}/${summary.rows.length}`}
        centerLabel="paid"
        segments={[
          { label: 'Paid', value: summary.paid, display: `${summary.paid} · ${money(summary.collected)}`, className: 'stroke-brand', dotClassName: 'bg-brand' },
          { label: 'Not paid', value: summary.unpaid, display: `${summary.unpaid} · ${money(summary.expected - summary.collected)}`, className: 'stroke-gold', dotClassName: 'bg-gold' },
        ]}
        className="mb-5"
      />
      <DataTable columns={columns} rows={summary.rows} rowKey={(r) => r.member.id} highlight={(r) => r.member.id === myMemberId} />
    </Panel>
  );
}
