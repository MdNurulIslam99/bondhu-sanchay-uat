'use client';
import {useState} from 'react';import {Plus,Minus} from 'lucide-react';import {faqs} from '@/lib/data';
export default function FaqList({limit}){const [active,setActive]=useState(0);return <div className="faq-list">{faqs.slice(0,limit||faqs.length).map(([q,a],i)=><div className={'faq-item '+(active===i?'expanded':'')} key={q}><button onClick={()=>setActive(active===i?null:i)} aria-expanded={active===i} aria-controls={'answer-'+i}>{q}{active===i?<Minus size={19}/>:<Plus size={19}/>}</button>{active===i&&<p id={'answer-'+i}>{a}</p>}</div>)}</div>}
