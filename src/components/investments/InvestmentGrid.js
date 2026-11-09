import InvestmentCard from './InvestmentCard';

export default function InvestmentGrid({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <InvestmentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
