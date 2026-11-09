import { ArrowUpRight } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import { TextLink } from '@/components/ui/Button';
import DataTable from '@/components/ui/DataTable';
import Badge from '@/components/ui/Badge';
import { investments } from '@/data/investments';
import { totals } from '@/lib/payments';
import { money } from '@/lib/format';

export default function InvestmentTable({ shareRatio }) {
  const share = shareRatio;
  const columns = [
    { key: 'name', header: 'Project' },
    { key: 'category', header: 'Sector' },
    { key: 'amount', header: 'Invested', align: 'right', render: (i) => money(i.amount) },
    { key: 'profit', header: 'Profit', align: 'right', render: (i) => money(i.profit) },
    { key: 'share', header: 'Your share', align: 'right', render: (i) => money((i.amount + i.profit) * share) },
    { key: 'status', header: 'Status', render: (i) => <Badge tone={i.status === 'Completed' ? 'neutral' : 'success'}>{i.status}</Badge> },
  ];
  return (
    <Panel
      title="Where our savings are invested"
      subtitle={`Total invested ${money(totals.invested)} · Net profit ${money(totals.profit)}`}
      action={<TextLink href="/dashboard/profit">Profit &amp; cost sheet <ArrowUpRight size={16} /></TextLink>}
    >
      <DataTable columns={columns} rows={investments} rowKey={(i) => i.id} />
      <small className="mt-3 block text-muted">Investments can bring profit or loss; profit is not guaranteed. “Your share” is capital plus profit in proportion to your contribution (estimate).</small>
    </Panel>
  );
}
