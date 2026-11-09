import { cn } from '@/lib/cn';

/**
 * segments: [{ label, value, className (Tailwind stroke-* class), dotClassName (bg-* class), display? }]
 */
export default function DonutChart({ segments, centerValue, centerLabel, size = 160, ariaLabel, className }) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = 15.9155, C = 2 * Math.PI * r; // circumference of r=15.9155 is ~100
  let offset = 0;
  return (
    <div className={cn('flex flex-col items-center gap-4 sm:flex-row sm:gap-6', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 36 36" role="img" aria-label={ariaLabel} className="size-full -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" className="stroke-sand" strokeWidth="4.2" />
          {segments.map((s) => {
            const len = (s.value / total) * C;
            const el = (
              <circle
                key={s.label}
                cx="18"
                cy="18"
                r={r}
                fill="none"
                strokeWidth="4.2"
                className={s.className}
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-offset}
              >
                <title>{`${s.label}: ${s.display ?? s.value}`}</title>
              </circle>
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <strong className="font-sans text-2xl leading-none">{centerValue}</strong>
          {centerLabel && <span className="mt-1 text-[11px] text-muted">{centerLabel}</span>}
        </div>
      </div>
      <ul className="grid w-full gap-2 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span className={cn('size-2.5 rounded-full', s.dotClassName)} />
              {s.label}
            </span>
            <strong className="font-semibold">{s.display ?? s.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
