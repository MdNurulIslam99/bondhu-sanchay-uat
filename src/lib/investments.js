import { investments, PROFIT_SHEET_THROUGH } from '@/data/investments';
import { allMonthKeys, monthLabel } from '@/lib/payments';

const sum = (list, pick) => list.reduce((total, x) => total + pick(x), 0);
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// '2026-09-23' -> '23 Sep 2026'
export const formatDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${SHORT_MONTHS[month - 1]} ${year}`;
};

// Month of the project's first capital, e.g. 'April 2026'.
export const investedSince = (item) => monthLabel(item.tranches[0].date.slice(0, 7));

// One project's account: a row per closed month, plus the sheet's summary figures.
function buildLedger(item) {
  const start = item.tranches[0].firstMonth;
  const months = allMonthKeys
    .filter((key) => key >= start && key <= PROFIT_SHEET_THROUGH)
    .map((key) => {
      const entry = item.collections[key];
      return {
        key,
        expected: sum(item.tranches.filter((t) => t.firstMonth <= key), (t) => t.monthlyProfit),
        received: entry?.received ?? 0,
        cost: entry?.cost ?? 0,
        costNote: entry?.costNote,
        collected: Boolean(entry),
      };
    });
  const gross = sum(months, (m) => m.received + m.cost);
  const expected = sum(months, (m) => m.expected);
  return {
    ...item,
    months,
    monthsRun: months.length,
    monthsCollected: months.filter((m) => m.collected).length,
    monthlyProfit: sum(item.tranches, (t) => t.monthlyProfit),
    gross,
    cost: sum(months, (m) => m.cost),
    expected,
    pending: expected - gross,
  };
}

export const ledgers = investments.map(buildLedger);

export const ledgerTotals = {
  invested: sum(ledgers, (l) => l.amount),
  monthlyProfit: sum(ledgers, (l) => l.monthlyProfit),
  gross: sum(ledgers, (l) => l.gross),
  cost: sum(ledgers, (l) => l.cost),
  net: sum(ledgers, (l) => l.profit),
  expected: sum(ledgers, (l) => l.expected),
  pending: sum(ledgers, (l) => l.pending),
};

// Every closed month from the first project onward.
export const ledgerMonths = (() => {
  const first = ledgers.map((l) => l.tranches[0].firstMonth).sort()[0];
  return allMonthKeys.filter((key) => key >= first && key <= PROFIT_SHEET_THROUGH);
})();

export const netForMonth = (key) => sum(ledgers, (l) => l.collections[key]?.received ?? 0);

export const costEntries = ledgers.flatMap((l) => l.months.filter((m) => m.cost > 0).map((m) => ({ project: l.name, key: m.key, amount: m.cost, note: m.costNote })));
