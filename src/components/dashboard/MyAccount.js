import { CheckCircle, AlertTriangle } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import { memberAccount, monthLabel, totals } from '@/lib/payments';
import { money } from '@/lib/format';

// The logged-in member's own account summary.
export default function MyAccount({ member, title = 'My account', subtitle }) {
  const a = memberAccount(member.id);
  const clear = a.dueMonths.length === 0;
  const rows = [
    ['Total deposited', money(a.paidTotal), `${a.paidMonths} of ${a.paidMonths + a.dueMonths.length} months`],
    ['Total due', money(a.dueTotal), clear ? 'Nothing due' : `${a.dueMonths.length} month${a.dueMonths.length > 1 ? 's' : ''} unpaid`],
    ['Your profit share', money(a.profitShare), `${(a.ratio * 100).toFixed(1)}% of ${money(totals.profit)} total profit`],
    ['Your current value', money(a.valueNow), 'Deposits + profit share'],
  ];
  return (
    <Panel title={title} subtitle={subtitle ?? member.name} className="mb-6">
      <div className={`mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${clear ? 'bg-mint text-brand' : 'bg-[#fbf1dc] text-[#8a6414]'}`} role="status">
        {clear ? <CheckCircle size={20} className="mt-0.5" /> : <AlertTriangle size={20} className="mt-0.5" />}
        <span>{clear ? 'All your monthly deposits are up to date. Thank you!' : `You have ${money(a.dueTotal)} due. Please deposit for the months below.`}</span>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([label, value, note]) => (
          <div key={label} className="rounded-xl border border-line p-4">
            <dt className="text-[13px] text-muted">{label}</dt>
            <dd className="mt-1 font-sans text-2xl font-semibold">{value}</dd>
            <dd className="mt-1 text-xs text-muted">{note}</dd>
          </div>
        ))}
      </dl>
      {!clear && (
        <div className="mt-5">
          <h4 className="mb-2 text-sm font-semibold">Months not paid</h4>
          <div className="flex flex-wrap gap-2">
            {a.dueMonths.map((k) => (
              <Badge key={k} tone="danger">{monthLabel(k)}</Badge>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
