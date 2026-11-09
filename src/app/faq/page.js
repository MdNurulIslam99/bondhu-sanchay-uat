import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import FaqList from '@/components/home/FaqList';
import JoinBanner from '@/components/layout/JoinBanner';

export const metadata = { title: 'FAQ' };

export default function FAQ() {
  return (
    <>
      <PageHero eyebrow="Your questions, our answers" title="Know the details, move ahead with confidence.">
        Answers to common questions about saving, membership and investments.
      </PageHero>
      <Section innerClassName="max-w-[850px]">
        <FaqList />
      </Section>
      <JoinBanner />
    </>
  );
}
