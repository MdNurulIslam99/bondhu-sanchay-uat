'use client';
import { useState } from 'react';
import InvestmentGrid from './InvestmentGrid';
import { investments, investmentCategories } from '@/data/investments';
import { cn } from '@/lib/cn';

const ALL = 'All projects';

export default function InvestmentExplorer() {
  const [filter, setFilter] = useState(ALL);
  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2 md:gap-3" role="group" aria-label="Project filter">
        {[ALL, ...investmentCategories].map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={filter === x}
            onClick={() => setFilter(x)}
            className={cn('rounded-full border px-4 py-2 text-sm md:px-6', filter === x ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand')}
          >
            {x}
          </button>
        ))}
      </div>
      <InvestmentGrid items={investments.filter((i) => filter === ALL || i.category === filter)} />
    </>
  );
}
