import { members } from '@/data/members';
import { investments } from '@/data/investments';
import { MONTHLY_FEE, START_MONTH, LATEST_MONTH, PAID_THROUGH } from '@/data/payments';

const NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const toKey = (year, month) => `${year}-${String(month).padStart(2, '0')}`;
export const parseKey = (key) => {
  const [year, month] = key.split('-').map(Number);
  return { year, month };
};
export const monthIndex = (key) => {
  const { year, month } = parseKey(key);
  return year * 12 + month - 1;
};
export const monthLabel = (key) => {
  const { year, month } = parseKey(key);
  return `${NAMES[month - 1]} ${year}`;
};
export const shortMonth = (key) => NAMES[parseKey(key).month - 1].slice(0, 3);
export const inRange = (key) => monthIndex(key) >= monthIndex(START_MONTH) && monthIndex(key) <= monthIndex(LATEST_MONTH);

export const allMonthKeys = Array.from({ length: monthIndex(LATEST_MONTH) - monthIndex(START_MONTH) + 1 }, (_, i) => {
  const idx = monthIndex(START_MONTH) + i;
  return toKey(Math.floor(idx / 12), (idx % 12) + 1);
});

// Payment record for one member in one month: paid up to PAID_THROUGH, otherwise not paid.
export function getPayment(memberId, key) {
  const through = PAID_THROUGH[memberId];
  if (!inRange(key) || !through) return { status: 'none', amount: 0 };
  return monthIndex(key) <= monthIndex(through) ? { status: 'paid', amount: MONTHLY_FEE } : { status: 'missed', amount: 0 };
}

export function getMonthSummary(key) {
  const rows = members.map((member) => ({ member, ...getPayment(member.id, key) }));
  const paid = rows.filter((r) => r.status === 'paid').length;
  return {
    key,
    rows,
    paid,
    unpaid: rows.length - paid,
    collected: paid * MONTHLY_FEE,
    expected: rows.length * MONTHLY_FEE,
  };
}

export const monthlySeries = allMonthKeys.map((key) => ({
  ...getMonthSummary(key),
  profit: investments.reduce((a, i) => a + (i.collections[key]?.received ?? 0), 0),
}));

export const totals = (() => {
  const collected = monthlySeries.reduce((a, m) => a + m.collected, 0);
  const profit = monthlySeries.reduce((a, m) => a + m.profit, 0);
  const invested = investments.reduce((a, i) => a + i.amount, 0);
  return { collected, profit, invested, cash: collected - invested + profit, members: members.length };
})();

// Cumulative fund (savings + profit) at the end of each month.
export const cumulativeSeries = (() => {
  let sum = 0;
  return monthlySeries.map((m) => ({ key: m.key, value: (sum += m.collected + m.profit) }));
})();

// One member's account: what they paid, what is due, and their share of the profit.
// Profit share is proportional to contribution (paid / group total collected).
export function memberAccount(memberId) {
  const history = memberHistory(memberId);
  const paid = history.filter((h) => h.status === 'paid');
  const dueMonths = history.filter((h) => h.status === 'missed').map((h) => h.key);
  const paidTotal = paid.length * MONTHLY_FEE;
  const ratio = totals.collected ? paidTotal / totals.collected : 0;
  return {
    paidMonths: paid.length,
    paidTotal,
    dueMonths,
    dueTotal: dueMonths.length * MONTHLY_FEE,
    expectedTotal: history.length * MONTHLY_FEE,
    ratio,
    profitShare: totals.profit * ratio,
    valueNow: paidTotal + totals.profit * ratio,
  };
}

export const memberHistory =(memberId) => allMonthKeys.map((key) => ({ key, ...getPayment(memberId, key) }));
