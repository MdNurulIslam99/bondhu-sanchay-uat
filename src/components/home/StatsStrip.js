import { Users, Wallet, TrendingUp, ChartNoAxesCombined } from 'lucide-react';
import Container from '@/components/ui/Container';
import StatCard from '@/components/ui/StatCard';
import { totals } from '@/lib/payments';
import { money } from '@/lib/format';

const stats = [
  [Users, String(totals.members), 'Active members', 'A family built on trust'],
  [Wallet, money(totals.collected), 'Total savings', 'Big capital from small savings'],
  [ChartNoAxesCombined, money(totals.invested), 'Total invested', 'Together on the path to possibility'],
  [TrendingUp, money(totals.profit), 'Profit earned', 'The fruit of shared effort'],
];

export default function StatsStrip() {
  return (
    <Container className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-line py-6 sm:grid-cols-4 sm:py-11">
      {stats.map(([icon, value, label, sub]) => (
        <StatCard key={label} icon={icon} value={value} label={label} sub={sub} />
      ))}
    </Container>
  );
}
