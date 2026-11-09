import { HandHeart, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/Button';
import ContactForm from '@/components/forms/ContactForm';

export const metadata = { title: 'Contact & membership' };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="An invitation to begin" title="Come, let us start together.">
        Interested in joining, or want to know more? We would love to hear from you.
      </PageHero>
      <Section innerClassName="grid grid-cols-1 items-start gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <aside className="rounded-[22px] bg-cream p-6 sm:p-8">
          <HandHeart size={40} className="text-brand" />
          <h2 className="my-5 text-[29px] leading-snug">
            Your savings,
            <br />
            our shared strength.
          </h2>
          <p className="text-[15px] leading-[1.9] text-muted">Just ৳500 a month. Regular saving builds a good habit.</p>
          <ol className="my-5 list-decimal pl-5 leading-10 text-[#5e7160]">
            <li>Tell us you are interested</li>
            <li>Learn the membership rules</li>
            <li>Join the journey together</li>
          </ol>
          <TextLink href="/faq">
            Read the answers first <ArrowRight size={16} />
          </TextLink>
          <div className="mt-7">
            <Badge>Demo: real contact details have not been added yet.</Badge>
          </div>
        </aside>
        <ContactForm />
      </Section>
    </>
  );
}
