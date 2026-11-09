import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Panel from '@/components/ui/Panel';
import Avatar from '@/components/ui/Avatar';
import JoinBanner from '@/components/layout/JoinBanner';
import { members, initials, maskPhone } from '@/data/members';
import { membershipPerks } from '@/data/home';

export const metadata = { title: 'Our members' };

export default function Members() {
  return (
    <>
      <PageHero eyebrow="Our family" title="Every member, a possibility.">
        {members.length} friends joined by one dream. Mobile numbers are partly hidden to protect member privacy.
      </PageHero>
      <Section>
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-6">
          {members.map((m, i) => (
            <Link key={m.id} href={`/dashboard/members/${m.id}`} className="block rounded-[22px]">
              <Card as="article" hover className="h-full px-3 py-6 text-center sm:p-8">
                <Avatar text={initials(m.name)} tone={i} className="mx-auto mb-5" />
                <h3 className="text-[17px] sm:text-xl">{m.name}</h3>
                <p className="mt-2 text-xs text-muted sm:text-sm">Member #{m.sl} · {maskPhone(m.phone)}</p>
              </Card>
            </Link>
          ))}
        </div>
        <Panel title="What membership means for you" className="mt-10" bodyClassName="grid gap-7 pt-2 md:grid-cols-3">
          {membershipPerks.map(([Icon, t]) => (
            <div key={t}>
              <Icon className="text-brand" />
              <h3 className="mt-3.5 text-[17px]">{t}</h3>
            </div>
          ))}
        </Panel>
      </Section>
      <JoinBanner />
    </>
  );
}
