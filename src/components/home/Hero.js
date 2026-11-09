import { ArrowUpRight, ArrowRight, ShieldCheck, Users, Wallet, TrendingUp, Leaf, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { members, initials } from '@/data/members';
import { PROFIT_SHEET_THROUGH } from '@/data/investments';
import { monthLabel } from '@/lib/payments';

const avatarTones = ['bg-[#d7dec8]', 'bg-[#e4ccb1]', 'bg-[#c8d9cf]', 'bg-[#d7cdbb]'];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <Container className="grid grid-cols-1 items-center gap-9 pb-11 pt-9 md:grid-cols-[1.07fr_1fr] md:gap-12 md:pb-16 md:pt-[70px] lg:gap-[70px]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dfe7d9] bg-[#edf1e6] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.4px] text-[#527154] sm:text-xs">
            <i className="size-1.5 rounded-full bg-[#69875e]" /> From friendship to trust, from trust to prosperity
          </span>
          <h1 className="my-6 text-[42px] leading-[1.3] tracking-[-1.6px] sm:text-5xl lg:text-[57px] min-[1500px]:text-6xl">
            Small savings,
            <br />
            building a{' '}
            <span className="relative inline-block text-clay">
              big tomorrow.
              <svg viewBox="0 0 360 20" aria-hidden="true" className="absolute -bottom-2 left-0 h-[18px] w-full fill-none stroke-gold stroke-[3] [stroke-linecap:round]">
                <path d="M4 13 Q170 -4 352 10 M45 19 Q190 3 317 15" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-[470px] text-base leading-[1.9] text-[#6c776c] sm:text-[17px]">
            Just <strong className="font-semibold text-ink">৳500 a month</strong>. Your regular savings and our shared effort create a future full of possibility. Bondhu Sanchay is a promise to move forward together.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/contact">
              Join us <ArrowUpRight size={19} />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              Our story <ArrowRight size={18} />
            </ButtonLink>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex pl-1">
              {members.slice(0, 4).map((m, i) => (
                <span key={m.id} className={`-ml-1 grid size-8 place-items-center rounded-full border-2 border-cream text-[13px] text-[#48594a] ${avatarTones[i]}`}>
                  {initials(m.name)[0]}
                </span>
              ))}
            </div>
            <div>
              <strong className="block text-[13px] font-medium">A family of {members.length} moving ahead together</strong>
              <small className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                <ShieldCheck size={13} /> Transparency, trust and mutual support
              </small>
            </div>
          </div>
        </div>

        <div className="relative mx-2.5 pb-3 pl-3.5 pr-1.5 pt-2 sm:mx-0 sm:pl-[18px] sm:pr-3">
          <div className="relative h-[350px] overflow-hidden rounded-t-[200px] rounded-b-[28px] bg-[#244d2f] sm:h-[420px] lg:h-[455px] min-[1500px]:h-[485px]">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=90"
              alt="Sunlight in a green forest, a symbol of growth and possibility"
              className="size-full"
            />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_35%,#0c291ce0)]" />
            <div className="absolute bottom-8 left-6 z-[1] text-white sm:left-8">
              <span className="text-[9px] tracking-[3px] text-[#dbe6c0]">GROWING TOGETHER</span>
              <h3 className="mt-3 font-serif text-2xl font-medium leading-normal sm:text-[28px]">
                Our roots are in friendship,
                <br />
                our future is in our hands.
              </h3>
            </div>
          </div>
          <div className="absolute -left-3 top-8 z-[2] flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[0_10px_40px_#17382015] sm:-left-5 sm:px-5 sm:py-4">
            <span className="grid size-[43px] place-items-center rounded-[10px] bg-[#eef4e9] text-brand">
              <Wallet size={24} />
            </span>
            <div>
              <small className="block text-xs text-muted">Monthly saving</small>
              <strong className="block font-sans font-bold text-[22px] leading-snug sm:text-[25px]">
                ৳500 <span className="font-sans text-xs font-normal text-muted">/ member</span>
              </strong>
            </div>
            <span className="ml-3 hidden rounded-full bg-brand p-[3px] text-white min-[641px]:block">
              <Check size={14} />
            </span>
          </div>
          <div className="absolute -bottom-5 -right-1.5 flex items-center gap-3 rounded-[9px] bg-paper px-5 py-4 text-brand shadow-[0_12px_35px_#18382512] sm:-bottom-10 sm:-right-9 sm:px-6">
            <TrendingUp size={25} />
            <div>
              <strong className="block font-serif text-base">Growing together</strong>
              <small className="mt-0.5 block text-[11px] text-muted sm:text-xs">Today&apos;s savings, tomorrow&apos;s possibilities</small>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-[#e1e6d9] py-5 text-[11px] text-[#667360] sm:text-[13px] md:justify-start">
        <span className="flex items-center gap-2">
          <ShieldCheck size={18} /> Transparent accounts
        </span>
        <span className="flex items-center gap-2">
          <Users size={18} /> Shared decisions
        </span>
        <span className="flex items-center gap-2">
          <Leaf size={18} /> Responsible investing
        </span>
        <span className="w-full text-center text-[10px] text-[#7e8678] md:ml-auto md:w-auto md:text-[11px]">Profit figures through {monthLabel(PROFIT_SHEET_THROUGH)}</span>
      </Container>
    </section>
  );
}
