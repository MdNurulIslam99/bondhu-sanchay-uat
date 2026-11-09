import { ArrowUpRight, Sprout } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';

export default function JoinBanner() {
  return (
    <Container className="relative mb-11 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0f5a45,#0a3a2d_70%,#c8643c)] px-7 py-8 text-white md:mb-[70px] md:flex-row md:items-center md:gap-8 md:px-14 md:py-11">
      <div className="relative z-[1]">
        <Eyebrow light>Moving forward together</Eyebrow>
        <h2 className="text-[30px] leading-snug md:text-[34px]">
          Your small savings,
          <br />
          our big tomorrow.
        </h2>
        <p className="mt-3 text-[13px] text-[#bfcec0] md:text-sm">Start a new journey of possibility with just ৳500 a month.</p>
      </div>
      <ButtonLink href="/contact" variant="cream" className="relative z-[1]">
        Become a member <ArrowUpRight size={19} />
      </ButtonLink>
      <Sprout aria-hidden="true" className="absolute -bottom-11 -right-12 size-[290px] -rotate-[20deg] opacity-[0.06] md:right-52" />
    </Container>
  );
}
