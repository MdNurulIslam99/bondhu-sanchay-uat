import Eyebrow from './Eyebrow';
import { TextLink } from './Button';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, description, href, label }) {
  return (
    <div className="mb-6 flex flex-col items-start gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between md:gap-6">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[29px] leading-[1.4] tracking-[-0.6px] md:text-4xl">{title}</h2>
        {description && <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[15px]">{description}</p>}
      </div>
      {href && (
        <TextLink href={href}>
          {label} <ArrowRight size={18} />
        </TextLink>
      )}
    </div>
  );
}
