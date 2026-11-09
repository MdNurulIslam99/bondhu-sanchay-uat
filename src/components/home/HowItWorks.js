import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { howSteps } from '@/data/home';

export default function HowItWorks() {
  return (
    <Section className="pb-0 md:pb-0">
      <SectionHeading eyebrow="An easy start, a bright future" title="How the journey works" description="Three simple steps from saving to possibility." />
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {howSteps.map(([Icon, n, title, text]) => (
          <Card as="article" hover key={n} className="p-6 md:px-8 md:py-7">
            <div className="mb-4 flex items-center justify-between md:mb-6">
              <span className="inline-flex rounded-[10px] bg-[#f0f4e9] p-3 text-brand">
                <Icon size={27} />
              </span>
              <b className="font-serif text-[42px] font-normal text-gold">{n}</b>
            </div>
            <h3 className="text-xl md:text-[21px]">{title}</h3>
            <p className="mt-3 text-[15px] leading-[1.9] text-muted md:text-sm">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
