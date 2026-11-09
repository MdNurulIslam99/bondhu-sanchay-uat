// Real collection data from the 2025 and 2026 collection sheets.
// Rule: a month with ৳500 written is "Paid"; an empty cell is "Not paid".
export const MONTHLY_FEE = 500;
// Investment started in June 2025 with the first ৳500 deposit.
export const START_MONTH = '2025-06';
// Latest month with sheet data.
export const LATEST_MONTH = '2026-11';

// Every member paid every month from START_MONTH up to (and including) this month.
// Months after it are empty in the sheet, so they count as Not paid.
export const PAID_THROUGH = {
  m01: '2026-10', // Md Sadekur Rahaman Pias
  m02: '2026-11', // Md Nurul Islam
  m03: '2026-11', // Mukto
  m04: '2026-11', // Shuvo
  m05: '2026-10', // Md Mostafizur Rahman
  m06: '2026-10', // Md Zubaer Al Mahmud Rabby
  m07: '2026-09', // Md Sadikur Rahman Sadik
  m08: '2026-11', // M Ragib Al Sharier Mahfuj
  m09: '2026-11', // Md Shafiur Rahman
  m10: '2026-08', // Istiak Riad
  m11: '2026-06', // Mahedi Hasan Opu
};
