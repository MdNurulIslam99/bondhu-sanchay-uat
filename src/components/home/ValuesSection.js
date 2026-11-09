import { ArrowUpRight, ShieldCheck, Users, TrendingUp, Leaf, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/Button';
import { promises } from '@/data/home';

const tagClass = 'absolute flex items-center gap-2 rounded-[7px] bg-white px-2 py-2 text-[11px] text-ink shadow-[0_6px_20px_#133b3010] sm:px-3 sm:text-[13px]';

export default function ValuesSection() {
  return (
    <section className="bg-[linear-gradient(160deg,#0f5a45,#0a3a2d)] py-10 text-white md:py-[65px]">
      <Container className="grid items-center gap-9 md:grid-cols-2 md:gap-[90px]">
        <div className="overflow-hidden rounded-[14px] bg-[#eaf0e3] p-7 text-center text-ink">
          <span className="text-[10px] font-bold tracking-[3px] text-clay">OUR FOUNDATION</span>
          <div className="relative mx-auto my-6 grid size-[260px] place-items-center rounded-full border border-dashed border-[#b5c6a8] sm:size-[300px]">
            <div className="flex size-[185px] flex-col items-center justify-center gap-3 rounded-full border border-[#c9d5bf] bg-[#e1ead8] text-brand sm:size-[215px]">
              <Leaf size={42} />
              <strong className="font-serif text-[23px] font-medium">Together in trust</strong>
              <span className="text-[13px] text-[#6c7d60]">Bondhu Sanchay</span>
            </div>
            <span className={`${tagClass} -right-3 top-3`}>
              <ShieldCheck size={18} /> Transparency
            </span>
            <span className={`${tagClass} -right-3 bottom-9 sm:-right-6`}>
              <Users size={18} /> Cooperation
            </span>
            <span className={`${tagClass} -left-4 top-32 sm:-left-7`}>
              <TrendingUp size={18} /> Progress
            </span>
          </div>
          <p className="text-[15px] text-[#697e60]">One initiative. Many dreams.</p>
        </div>
        <div>
          <Eyebrow light>Our promise</Eyebrow>
          <h2 className="text-[32px] leading-[1.4] md:text-4xl">
            More than savings,
            <br />a bond of trust.
          </h2>
          <p className="mb-6 mt-4 text-[15px] leading-[1.9] text-[#cfe2da]">Behind every taka is a friend&apos;s dream. Staying responsible to that dream is the foundation of our journey.</p>
          {promises.map(([title, text]) => (
            <div key={title} className="my-5 flex gap-3.5">
              <span className="h-[26px] rounded-full bg-[#e4eddf] p-[5px] text-brand">
                <Check size={16} />
              </span>
              <div>
                <h3 className="text-[17px]">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#cfe2da]">{text}</p>
              </div>
            </div>
          ))}
          <TextLink href="/about" className="text-gold">
            Learn more about us <ArrowUpRight size={17} />
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
