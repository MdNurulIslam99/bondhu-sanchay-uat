'use client';
import {useState} from 'react';import {investments} from '@/lib/data';import {InvestmentCard} from './UI';
const ALL='All projects';
export default function InvestmentExplorer(){const [filter,setFilter]=useState(ALL);return <><div className="filters" aria-label="Project filter">{[ALL,'Agriculture','Business','Livestock'].map(x=><button key={x} aria-pressed={filter===x} onClick={()=>setFilter(x)} className={filter===x?'selected':''}>{x}</button>)}</div><div className="investment-grid">{investments.filter(i=>filter===ALL||i.category===filter).map(i=><InvestmentCard item={i} key={i.id}/>)}</div></>}
