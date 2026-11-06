import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Users,
  Wallet,
  TrendingUp,
  Leaf,
  Check,
  HandCoins,
  ChartNoAxesCombined,
} from "lucide-react";
import { SectionHeading, InvestmentCard } from "@/components/UI";
import { JoinBanner } from "@/components/Footer";
import FaqList from "@/components/FaqList";
import { investments } from "@/lib/data";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <i /> From friendship to trust, from trust to prosperity
            </span>
            <h1>
              Small savings,
              <br />
              building a{" "}
              <span>
                big tomorrow.
                <svg viewBox="0 0 360 20" aria-hidden="true">
                  <path d="M4 13 Q170 -4 352 10 M45 19 Q190 3 317 15" />
                </svg>
              </span>
            </h1>
            <p>
              Just <strong>৳500 a month</strong>. Your regular savings and our
              shared effort create a future full of possibility. Bondhu Sanchay
              is a promise to move forward together.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/contact">
                Join us <ArrowUpRight size={19} />
              </Link>
              <Link className="button secondary" href="/about">
                Our story <ArrowRight size={18} />
              </Link>
            </div>
            <div className="social-proof">
              <div className="avatars">
                {["R", "S", "A", "M"].map((x, i) => (
                  <span key={i}>{x}</span>
                ))}
              </div>
              <div>
                <strong>A family moving ahead together</strong>
                <small>
                  <ShieldCheck size={13} /> Transparency, trust and mutual
                  support
                </small>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=90"
                alt="Sunlight in a green forest, a symbol of growth and possibility"
              />
              <div className="photo-caption">
                <span>GROWING TOGETHER</span>
                <h3>
                  Our roots are in friendship,
                  <br />
                  our future is in our hands.
                </h3>
              </div>
            </div>
            <div className="saving-note">
              <span className="note-icon">
                <Wallet size={24} />
              </span>
              <div>
                <small>Monthly saving</small>
                <strong>
                  ৳500 <span>/ member</span>
                </strong>
              </div>
              <span className="note-check">
                <Check size={14} />
              </span>
            </div>
            <div className="growth-note">
              <TrendingUp size={25} />
              <div>
                <strong>Growing together</strong>
                <small>
                  Today&apos;s savings, tomorrow&apos;s possibilities
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="container trust-strip">
          <span>
            <ShieldCheck size={18} /> Transparent accounts
          </span>
          <span>
            <Users size={18} /> Shared decisions
          </span>
          <span>
            <Leaf size={18} /> Responsible investing
          </span>
          <span className="demo-label">All figures shown are samples</span>
        </div>
      </section>
      <section className="container stats">
        {[
          [Users, "48", "Active members", "A family built on trust"],
          [
            Wallet,
            "৳432,000",
            "Total savings",
            "Big capital from small savings",
          ],
          [
            ChartNoAxesCombined,
            "৳300,000",
            "Total invested",
            "Together on the path to possibility",
          ],
          [
            TrendingUp,
            "৳36,000",
            "Profit earned",
            "The fruit of shared effort",
          ],
        ].map(([Icon, value, label, sub]) => (
          <div className="stat p-5" key={label}>
            <span className="stat-icon">
              <Icon size={22} />
            </span>
            <strong>{value}</strong>
            <h3>{label}</h3>
            <p>{sub}</p>
          </div>
        ))}
      </section>
      <section className="section how-section">
        <div className="container">
          <SectionHeading
            eyebrow="An easy start, a bright future"
            title="How the journey works"
            description="Three simple steps from saving to possibility."
          />
          <div className="steps">
            {[
              [
                Users,
                "01",
                "Join the family",
                "Become a member and join a family built on trust and support.",
              ],
              [
                HandCoins,
                "02",
                "Save regularly",
                "Deposit ৳500 each month. Small savings grow into big capital.",
              ],
              [
                TrendingUp,
                "03",
                "Move ahead together",
                "Invest through shared decisions and share the results openly.",
              ],
            ].map(([Icon, n, t, d]) => (
              <article className="step" key={n}>
                <div className="step-top">
                  <span>
                    <Icon size={27} />
                  </span>
                  <b>{n}</b>
                </div>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Our investments"
          title="From savings to new possibilities"
          description="Planned ventures, shared participation. Here are our sample projects."
          href="/investments"
          label="See all investments"
        />
        <div className="investment-grid">
          {investments.map((item) => (
            <InvestmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="values-section">
        <div className="container values-grid">
          <div className="values-art">
            <span className="eyebrow">OUR FOUNDATION</span>
            <div className="orbit">
              <div className="orbit-inner">
                <Leaf size={42} />
                <strong>Together in trust</strong>
                <span>Bondhu Sanchay</span>
              </div>
              <span className="orbit-tag tag-one">
                <ShieldCheck size={18} /> Transparency
              </span>
              <span className="orbit-tag tag-two">
                <Users size={18} /> Cooperation
              </span>
              <span className="orbit-tag tag-three">
                <TrendingUp size={18} /> Progress
              </span>
            </div>
            <p>One initiative. Many dreams.</p>
          </div>
          <div>
            <span className="eyebrow">Our promise</span>
            <h2>
              More than savings,
              <br />a bond of trust.
            </h2>
            <p className="muted">
              Behind every taka is a friend&apos;s dream. Staying responsible to
              that dream is the foundation of our journey.
            </p>
            {[
              [
                "Accounts stay transparent",
                "Every deposit, investment and profit is easy to look up.",
              ],
              [
                "We decide together",
                "Members take part and talk things through before every venture.",
              ],
              [
                "Thinking long term",
                "Regular saving builds the foundation of our future.",
              ],
            ].map(([t, d]) => (
              <div className="value" key={t}>
                <span>
                  <Check size={16} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
            <Link className="text-link" href="/about">
              Learn more about us <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container faq-grid">
        <div>
          <span className="eyebrow">Want to know more?</span>
          <h2>
            A few questions,
            <br />
            simple answers.
          </h2>
          <p className="muted">
            Find answers to your questions about Bondhu Sanchay.
          </p>
          <Link className="text-link" href="/faq">
            See all questions <ArrowRight size={17} />
          </Link>
        </div>
        <FaqList limit={4} />
      </section>
      <JoinBanner />
    </>
  );
}
