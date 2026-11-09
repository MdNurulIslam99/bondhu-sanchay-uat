// Investment records from the "Bondhu Sanchay invest & profit" sheet.
// To update: add a line to `collections` when profit comes in, or to `tranches` for new capital.
// Every total on the site (home, reports, dashboard, profit sheet) is derived from this file.

// Last month the profit sheet has been closed for.
export const PROFIT_SHEET_THROUGH = '2026-10';

// tranches:    capital given. `monthlyProfit` is the agreed profit per month;
//              `firstMonth` is the first month that capital earns profit.
// collections: profit actually collected. `received` is net of `cost`.
// placeholder: business details are dummy text until the real ones are confirmed
//              (the money figures are always from the sheet).
const projects = [
  {
    id: 'mitali-cosmetic-bag-house',
    name: 'Mitali Cosmetic & Bag House',
    category: 'Retail',
    partner: 'Ashik',
    description: 'A neighbourhood shop selling cosmetics, skincare and ladies’ bags.',
    about: 'Capital from the circle keeps the shop’s shelves stocked with everyday cosmetics, skincare and bags, with new stock bought ahead of the festival seasons.',
    facts: [
      ['Business type', 'Cosmetics and bag shop'],
      ['Sells', 'Cosmetics, skincare, ladies’ bags and gift items'],
      ['Capital used for', 'Buying stock'],
    ],
    placeholder: true,
    image: '/projects/mitali-cosmetics.jpg',
    imageAlt: 'Makeup brushes, lipstick and compact powder laid out on a cream surface',
    imageIsStock: true,
    status: 'Ongoing',
    tranches: [{ date: '2026-04-01', amount: 40000, monthlyProfit: 2000, firstMonth: '2026-04' }],
    collections: {
      '2026-04': { received: 1000, cost: 1000, costNote: 'Cashout cost' },
      '2026-05': { received: 2000 },
      '2026-06': { received: 2000 },
      '2026-07': { received: 2000 },
      '2026-08': { received: 2000 },
    },
  },
  {
    id: 'ahnaf-enterprise',
    name: 'Ahnaf Enterprise',
    category: 'Agriculture',
    partner: 'Mukto',
    description: 'A fertiliser and pesticide shop serving local farmers in Jibannagar.',
    about: 'Messrs Ahnaf Enterprise sells fertilisers such as Urea, TSP and MOP, along with pesticides and other crop-care products, to farmers around Jibannagar.',
    facts: [
      ['Business type', 'Fertiliser and pesticide seller'],
      ['Sells', 'Urea, TSP, MOP, pesticides and crop-care products'],
      ['Location', 'High School Market, Kaliganj Road, Jibannagar, Chuadanga'],
    ],
    image: '/projects/ahnaf-enterprise.jpg',
    imageAlt: 'Storefront of Messrs Ahnaf Enterprise with its green signboard and sacks of fertiliser at the entrance',
    imageClass: 'object-top',
    status: 'Ongoing',
    tranches: [{ date: '2026-07-01', amount: 20000, monthlyProfit: 700, firstMonth: '2026-07' }],
    collections: {},
  },
  {
    id: 'getech',
    name: 'Getech Business',
    category: 'Technology',
    partner: 'Sadik',
    description: 'A technology trading business dealing in gadgets and accessories.',
    about: 'Getech buys and resells phones, computer accessories and other gadgets. The circle’s capital was added in three steps to fund larger stock purchases.',
    facts: [
      ['Business type', 'Gadget and accessories trading'],
      ['Sells', 'Phones, computer accessories and gadgets'],
      ['Capital used for', 'Buying stock in larger lots'],
    ],
    placeholder: true,
    image: '/projects/getech.jpg',
    imageAlt: 'A laptop, headphones, smartwatch and phone on a grey desk',
    imageIsStock: true,
    status: 'Ongoing',
    tranches: [
      { date: '2026-09-23', amount: 20000, monthlyProfit: 700, firstMonth: '2026-10' },
      { date: '2026-09-30', amount: 10000, monthlyProfit: 400, firstMonth: '2026-10' },
      { date: '2026-10-25', amount: 10000, monthlyProfit: 400, firstMonth: '2026-11' },
    ],
    collections: {
      '2026-10': { received: 1100 },
    },
  },
];

const sum = (list, pick) => list.reduce((total, x) => total + pick(x), 0);

// `amount` = capital given, `profit` = net profit collected.
export const investments = projects.map((p) => ({
  ...p,
  amount: sum(p.tranches, (t) => t.amount),
  profit: sum(Object.values(p.collections), (c) => c.received),
}));

export const investmentCategories = [...new Set(projects.map((p) => p.category))];
