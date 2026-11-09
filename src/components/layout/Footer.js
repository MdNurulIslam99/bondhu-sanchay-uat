import Link from 'next/link';
import Brand from './Brand';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/Button';
import { footerGroups, legalLinks } from '@/data/site';

const linkClass = 'block py-1.5 text-[13px] text-[#6c796f] hover:text-brand';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#fafbf8] pt-9 md:pt-[53px]">
      <Container className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-9 lg:grid-cols-[1.45fr_0.8fr_0.85fr_0.85fr_1.25fr]">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Brand />
          <p className="my-4 text-[13px] leading-[1.9] text-muted">
            A little saved each month, prosperity shared.
            <br />
            A future built on friendship and trust.
          </p>
          <Badge>Preview · some details are placeholders</Badge>
        </div>
        {footerGroups.map((g) => (
          <div key={g.title}>
            <h4 className="mb-3 font-serif text-[15px] font-semibold">{g.title}</h4>
            {g.links.map(([href, label]) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <h4 className="mb-3 font-serif text-[15px] font-semibold">Start saving, keep growing</h4>
          <p className="mb-4 text-[13px] leading-[1.9] text-muted">
            Transparent accounts and shared decisions
            <br />
            guide every step we take.
          </p>
          <TextLink href="/contact">Join us ↗</TextLink>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-3 border-t border-line py-5 text-[11px] text-[#7d867a] md:flex-row md:items-center md:justify-between">
        <span>© 2026 Bondhu Sanchay. All rights reserved.</span>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
