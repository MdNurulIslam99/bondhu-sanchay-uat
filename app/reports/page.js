import {PageHero} from '@/components/UI';import Reports from '@/components/Reports';
export const metadata={title:'Financial reports'};
export default function ReportsPage(){return <><PageHero eyebrow="Trust through transparency" title="A clear account of every taka.">Consolidated sample reports of savings and profit. No personal financial data is published here.</PageHero><section className="section container"><Reports/></section></>}
