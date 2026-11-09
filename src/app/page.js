import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import HowItWorks from '@/components/home/HowItWorks';
import ValuesSection from '@/components/home/ValuesSection';
import FaqList from '@/components/home/FaqList';
import InvestmentGrid from '@/components/investments/InvestmentGrid';
import JoinBanner from '@/components/layout/JoinBanner';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Eyebrow from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/Button';
import { investments } from '@/data/investments';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <Section>
        <SectionHeading eyebrow="Our investments" title="From savings to new possibilities" description="Shared decisions, shared participation. Here are the projects we have invested in." href="/investments" label="See all investments" />
        <InvestmentGrid items={investments} />
      </Section>
      <ValuesSection />
      <Section innerClassName="grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-[90px]">
        <div>
          <Eyebrow>Want to know more?</Eyebrow>
          <h2 className="text-[29px] leading-[1.4] md:text-4xl">
            A few questions,
            <br />
            simple answers.
          </h2>
          <p className="mb-6 mt-4 text-[15px] leading-[1.9] text-muted">Find answers to your questions about Bondhu Sanchay.</p>
          <TextLink href="/faq">
            See all questions <ArrowRight size={17} />
          </TextLink>
        </div>
        <FaqList limit={4} />
      </Section>
      <JoinBanner />
    </>
  );
}
