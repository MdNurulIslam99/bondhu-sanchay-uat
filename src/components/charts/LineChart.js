import { niceScale } from './scale';
import { compactMoney, money } from '@/lib/format';
import { cn } from '@/lib/cn';

/** data: [{ label, sublabel?, value }]  — area line chart in pure SVG. */
export default function LineChart({ data, height = 240, format = compactMoney, titleFormat = money, ariaLabel, className }) {
  const W = 640, padL = 46, padR = 14, padT = 16, padB = data.some((d) => d.sublabel) ? 38 : 24;
  const H = height, plotH = H - padB - padT, plotW = W - padL - padR;
  const { max, ticks } = niceScale(Math.max(...data.map((d) => d.value), 0));
  const x = (i) => padL + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const y = (v) => padT + plotH - (v / max) * plotH;
  const line = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)} ${padT + plotH} L${x(0).toFixed(1)} ${padT + plotH} Z`;
  const every = Math.ceil(data.length / 9);
  const last = data.length - 1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className={cn('h-auto w-full', className)}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="stroke-line" strokeDasharray={t ? '3 4' : undefined} />
          <text x={padL - 8} y={y(t) + 3.5} textAnchor="end" className="fill-muted text-[10px]">
            {format(t)}
          </text>
        </g>
      ))}
      <path d={area} className="fill-brand/10" />
      <path d={line} className="fill-none stroke-brand" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={d.label + i}>
          <title>{`${d.sublabel ? d.label + ' ' + d.sublabel : d.label}: ${titleFormat(d.value)}`}</title>
          <circle cx={x(i)} cy={y(d.value)} r={i === last ? 5 : 3} className={i === last ? 'fill-clay stroke-white' : 'fill-brand'} strokeWidth="2" />
          {(i % every === 0 || i === last) && (
            <>
              <text x={x(i)} y={H - padB + 14} textAnchor="middle" className="fill-muted text-[10px]">
                {d.label}
              </text>
              {d.sublabel && (
                <text x={x(i)} y={H - padB + 27} textAnchor="middle" className="fill-[#a3ada6] text-[9px]">
                  {d.sublabel}
                </text>
              )}
            </>
          )}
        </g>
      ))}
      <text x={x(last)} y={y(data[last].value) - 11} textAnchor="end" className="fill-clay text-[11px] font-bold">
        {titleFormat(data[last].value)}
      </text>
    </svg>
  );
}
