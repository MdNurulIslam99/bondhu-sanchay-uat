'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { parseKey, toKey, monthIndex, shortMonth } from '@/lib/payments';

const sizes = {
  sm: { box: 'max-w-[260px] p-3', title: 'text-sm', cell: 'py-2 text-xs', gap: 'gap-1.5' },
  md: { box: 'max-w-[340px] p-4', title: 'text-base', cell: 'py-3 text-sm', gap: 'gap-2' },
  lg: { box: 'max-w-[440px] p-6', title: 'text-xl', cell: 'py-4 text-base', gap: 'gap-3' },
};

/**
 * Custom-size month picker.
 *  size:   'sm' | 'md' | 'lg'  (or pass className to override width)
 *  value:  'YYYY-MM'; onChange(key)
 *  min/max: first and last selectable month
 *  statusOf?(key) -> 'complete' | 'partial' | undefined  (adds a status dot)
 */
export default function MonthCalendar({ value, onChange, min, max, size = 'md', statusOf, className }) {
  const s = sizes[size] || sizes.md;
  const [year, setYear] = useState(parseKey(value).year);
  const minYear = parseKey(min).year, maxYear = parseKey(max).year;
  const selected = parseKey(value);

  return (
    <div className={cn('w-full rounded-2xl border border-line bg-white', s.box, className)}>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous year"
          disabled={year <= minYear}
          onClick={() => setYear(year - 1)}
          className="rounded-full p-1.5 text-brand hover:bg-mint disabled:text-[#c9cfc9] disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
        </button>
        <strong className={cn('font-serif', s.title)}>{year}</strong>
        <button
          type="button"
          aria-label="Next year"
          disabled={year >= maxYear}
          onClick={() => setYear(year + 1)}
          className="rounded-full p-1.5 text-brand hover:bg-mint disabled:text-[#c9cfc9] disabled:hover:bg-transparent"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className={cn('grid grid-cols-3', s.gap)} role="group" aria-label={`Months of ${year}`}>
        {Array.from({ length: 12 }, (_, i) => {
          const key = toKey(year, i + 1);
          const disabled = monthIndex(key) < monthIndex(min) || monthIndex(key) > monthIndex(max);
          const active = selected.year === year && selected.month === i + 1;
          const status = !disabled && statusOf?.(key);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              onClick={() => onChange(key)}
              className={cn(
                'relative rounded-xl border font-medium transition',
                s.cell,
                active ? 'border-brand bg-brand text-white' : 'border-line bg-paper text-ink hover:border-brand hover:bg-mint',
                disabled && 'cursor-not-allowed border-transparent bg-transparent text-[#c9cfc9] hover:border-transparent hover:bg-transparent',
              )}
            >
              {shortMonth(key)}
              {status && (
                <span
                  aria-hidden="true"
                  className={cn('absolute right-1.5 top-1.5 size-1.5 rounded-full', status === 'complete' ? (active ? 'bg-white' : 'bg-brand') : 'bg-gold')}
                />
              )}
            </button>
          );
        })}
      </div>
      {statusOf && (
        <p className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <i className="size-1.5 rounded-full bg-brand" /> All paid
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-1.5 rounded-full bg-gold" /> Some unpaid
          </span>
        </p>
      )}
    </div>
  );
}
