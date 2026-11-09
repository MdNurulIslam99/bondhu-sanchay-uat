import Panel from '@/components/ui/Panel';
import DataTable from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/Badge';
import { memberHistory, monthLabel } from '@/lib/payments';
import { money } from '@/lib/format';

const columns = [
  { key: 'month', header: 'Month', render: (r) => monthLabel(r.key) },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => money(r.amount) },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} labels={{ paid: 'Deposited' }} /> },
];

export default function DepositHistory({ memberId, title = 'Your monthly deposits' }) {
  const rows = memberHistory(memberId).reverse();
  const paid = rows.filter((r) => r.status === 'paid').length;
  return (
    <Panel title={title} subtitle={`${paid} of ${rows.length} months deposited · newest first`}>
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.key} maxHeight={420} />
    </Panel>
  );
}
