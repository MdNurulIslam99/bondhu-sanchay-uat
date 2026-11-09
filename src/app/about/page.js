import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import JoinBanner from '@/components/layout/JoinBanner';
import { aboutValues } from '@/data/home';

export const metadata = { title: 'About us' };

export default function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Started in friendship, headed for the future.">
        A shared effort built on small savings and big dreams: Bondhu Sanchay.
      </PageHero>
      <Section innerClassName="grid items-center gap-8 md:grid-cols-2 md:gap-[90px]">
        <img
          className="h-[280px] w-full rounded-tl-[70px] rounded-br-xl rounded-tr-xl rounded-bl-xl sm:h-[380px]"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85"
          alt="Morning light over a green field"
        />
        <div>
          <Eyebrow>Why Bondhu Sanchay?</Eyebrow>
          <h2 className="text-[29px] leading-[1.4] md:text-4xl">
            Not alone: we move ahead
            <br />
            with everyone beside us.
          </h2>
          <p className="my-4 text-[15px] leading-[1.9] text-muted">Every month each member contributes ৳500, beginning in June 2025. From this pooled saving, we invest in a range of ventures. Keeping every contribution and every investment result transparent is our goal.</p>
          <p className="text-[15px] leading-[1.9] text-muted">Bondhu Sanchay is an idea of cooperation, where a habit of regular saving, responsible decisions and mutual trust light our way.</p>
        </div>
      </Section>
      <Section className="pb-0 md:pb-0">
        <SectionHeading eyebrow="Our foundation" title="The values that hold us together" />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {aboutValues.map(([Icon, title, text]) => (
            <Card as="article" hover key={title} className="p-6 md:px-8 md:py-7">
              <Icon size={30} className="text-brand" />
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-[1.9] text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
      <div className="h-12 md:h-[75px]" />
      <JoinBanner />
    </>
  );
}
