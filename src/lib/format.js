export const money = (n) => '৳' + Math.round(n).toLocaleString('en-US');
export const compactMoney = (n) => (n >= 1000 ? '৳' + +(n / 1000).toFixed(1) + 'k' : '৳' + n);
