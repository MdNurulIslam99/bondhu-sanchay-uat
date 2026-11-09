'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Card from '@/components/ui/Card';
import { faqs } from '@/data/faqs';

export default function FaqList({ limit }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.slice(0, limit || faqs.length).map(([q, a], i) => {
        const open = active === i;
        return (
          <Card key={q} className="px-5 py-1">
            <h3 className="font-sans">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 py-4 text-left text-base font-medium sm:text-[17px]"
                onClick={() => setActive(open ? null : i)}
                aria-expanded={open}
                aria-controls={'answer-' + i}
              >
                <span>{q}</span>
                {open ? <Minus size={19} /> : <Plus size={19} />}
              </button>
            </h3>
            {open && (
              <p id={'answer-' + i} className="pb-5 pr-6 text-sm leading-[1.9] text-muted">
                {a}
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
