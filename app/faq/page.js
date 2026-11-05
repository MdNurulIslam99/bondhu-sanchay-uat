import {PageHero} from '@/components/UI';import FaqList from '@/components/FaqList';import {JoinBanner} from '@/components/Footer';
export const metadata={title:'FAQ'};
export default function FAQ(){return <><PageHero eyebrow="Your questions, our answers" title="Know the details, move ahead with confidence.">Answers to common questions about saving, membership and investments.</PageHero><section className="section container narrow"><FaqList/></section><JoinBanner/></>}
