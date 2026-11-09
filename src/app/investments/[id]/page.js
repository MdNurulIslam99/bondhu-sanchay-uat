import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Panel from '@/components/ui/Panel';
import Badge from '@/components/ui/Badge';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { investments } from '@/data/investments';
import { investedSince } from '@/lib/investments';
import { money } from '@/lib/format';

export function generateStaticParams() {
  return investments.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: investments.find((i) => i.id === id)?.name || 'Project' };
}

export default async function Detail({ params }) {
  const { id } = await params;
  const item = investments.find((i) => i.id === id);
  if (!item) notFound();
  return (
    <>
      <PageHero eyebrow={'Our investment · ' + item.category} title={item.name}>
        {item.description}
      </PageHero>
      <Section innerClassName="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.2fr_1fr] md:gap-9">
        <div className="min-w-0">
          <figure>
            <img className={`h-[260px] w-full rounded-[22px] md:h-[390px] ${item.imageClass ?? ''}`} src={item.image} alt={item.imageAlt} />
            {item.imageIsStock && <figcaption className="mt-2 text-xs text-muted">Representative photo, not the actual business.</figcaption>}
          </figure>
          <h2 className="mt-7 text-[28px]">About this business</h2>
          <p className="mt-3 text-[15px] leading-[1.9] text-muted">{item.about}</p>
          <dl className="mt-5 border-t border-line">
            {item.facts.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-line py-3 text-sm sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          {item.placeholder && <p className="mt-3 text-xs leading-relaxed text-muted">Business details are placeholder text until they are confirmed.</p>}
        </div>
        <Panel className="md:sticky md:top-[118px]">
          <Badge tone="success">{item.status}</Badge>
          <h2 className="mt-4 text-[28px]">Project accounts</h2>
          {[
            ['Invested since', investedSince(item), ''],
            ['Total invested', money(item.amount), ''],
            ['Net profit collected', money(item.profit), 'text-brand'],
          ].map(([label, value, tone]) => (
            <div key={label} className="flex items-center justify-between gap-5 border-b border-line py-5">
              <span>{label}</span>
              <strong className={`font-sans text-2xl ${tone}`}>{value}</strong>
            </div>
          ))}
          <p className="mt-4 text-[13px] leading-[1.9] text-muted">Investments can bring profit or loss; profit is not guaranteed.</p>
          <div className="mt-5 flex flex-col items-start gap-4">
            <ButtonLink href="/dashboard/profit" size="sm">
              Members: monthly profit &amp; costs <ArrowUpRight size={16} />
            </ButtonLink>
            <TextLink href="/investments">← Back to all investments</TextLink>
          </div>
        </Panel>
      </Section>
    </>
  );
}
