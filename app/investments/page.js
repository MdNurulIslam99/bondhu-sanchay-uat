import {PageHero} from '@/components/UI';import InvestmentExplorer from '@/components/InvestmentExplorer';import {JoinBanner} from '@/components/Footer';
export const metadata={title:'Investments'};
export default function Investments(){return <><PageHero eyebrow="Together toward possibility" title="Our investment ventures">From saving to production, from enterprise to progress. All projects and figures are samples.</PageHero><section className="container section"><InvestmentExplorer/></section><JoinBanner/></>}
