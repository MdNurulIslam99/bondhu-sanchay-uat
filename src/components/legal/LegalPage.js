import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { TextLink } from '@/components/ui/Button';
import { LEGAL_UPDATED } from '@/data/legal';

// Renders a legal document: { title, eyebrow, intro, sections: [{ heading, body?: string[], list?: string[] }] }
export default function LegalPage({ doc }) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title}>
        {doc.intro}
      </PageHero>
      <Section innerClassName="max-w-[850px]">
        <p className="mb-8 text-sm text-muted">Last updated: {LEGAL_UPDATED}</p>
        <div className="space-y-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-[22px] md:text-2xl">{s.heading}</h2>
              {s.body?.map((p) => (
                <p key={p} className="mb-3 text-[15px] leading-[1.9] text-[#4d5f56]">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-[1.9] text-[#4d5f56] marker:text-brand">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-6 border-t border-line pt-6">
          <TextLink href="/privacy-policy">Privacy Policy</TextLink>
          <TextLink href="/terms-and-conditions">Terms & Conditions</TextLink>
          <TextLink href="/refund-policy">Refund Policy</TextLink>
          <TextLink href="/contact">Contact us</TextLink>
        </div>
      </Section>
    </>
  );
}
