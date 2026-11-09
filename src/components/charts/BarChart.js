import { niceScale } from './scale';
import { compactMoney, money } from '@/lib/format';
import { cn } from '@/lib/cn';

/**
 * data: [{ label, sublabel?, value, active? }]
 * Pure SVG, scales to its container width.
 */
export default function BarChart({ data, height = 240, format = compactMoney, titleFormat = money, ariaLabel, className }) {
  const W = Math.max(520, data.length * 40), padL = 46, padB = data.some((d) => d.sublabel) ? 38 : 24, padT = 12;
  const H = height, plotH = H - padB - padT, plotW = W - padL - 8;
  const { max, ticks } = niceScale(Math.max(...data.map((d) => d.value), 0));
  const slot = plotW / data.length, bw = Math.min(30, slot * 0.62);
  const showValues = data.length <= 8;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className={cn('h-auto w-full', className)}>
      {ticks.map((t) => {
        const y = padT + plotH - (t / max) * plotH;
        return (
          <g key={t}>
            <line x1={padL} x2={W - 8} y1={y} y2={y} className="stroke-line" strokeDasharray={t ? '3 4' : undefined} />
            <text x={padL - 8} y={y + 3.5} textAnchor="end" className="fill-muted text-[10px]">
              {format(t)}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * plotH, x = padL + i * slot + (slot - bw) / 2, y = padT + plotH - h;
        return (
          <g key={d.label + i}>
            <title>{`${d.sublabel ? d.label + ' ' + d.sublabel : d.label}: ${titleFormat(d.value)}`}</title>
            <rect x={x} y={y} width={bw} height={Math.max(h, 2)} rx="4" className={d.active ? 'fill-clay' : i % 2 ? 'fill-[#b8c9a6]' : 'fill-[#6c987b]'} />
            {showValues && (
              <text x={x + bw / 2} y={y - 5} textAnchor="middle" className="fill-ink text-[10px]">
                {format(d.value)}
              </text>
            )}
            <text x={x + bw / 2} y={H - padB + 14} textAnchor="middle" className="fill-muted text-[10px]">
              {d.label}
            </text>
            {d.sublabel && (
              <text x={x + bw / 2} y={H - padB + 27} textAnchor="middle" className="fill-[#a3ada6] text-[9px]">
                {d.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
