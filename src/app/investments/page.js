import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import InvestmentExplorer from '@/components/investments/InvestmentExplorer';
import JoinBanner from '@/components/layout/JoinBanner';

export const metadata = { title: 'Investments' };

export default function Investments() {
  return (
    <>
      <PageHero eyebrow="Together toward possibility" title="Our investment ventures">
        From saving to enterprise, these are the businesses our savings are working in today.
      </PageHero>
      <Section>
        <InvestmentExplorer />
      </Section>
      <JoinBanner />
    </>
  );
}
