// Round a max value up to a "nice" axis ceiling and return evenly spaced ticks.
export function niceScale(max, steps = 4) {
  if (max <= 0) return { max: 1, ticks: [0, 1] };
  const raw = max / steps;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const unit = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((u) => u >= raw);
  const top = unit * steps;
  return { max: top, ticks: Array.from({ length: steps + 1 }, (_, i) => i * unit) };
}
