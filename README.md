# Bondhu Sanchay — Public Website

Independent Next.js App Router project, written in JavaScript with Tailwind CSS v4 and reusable custom components. Bengali UI, responsive layouts, emerald/ivory/gold palette. Admin and backend are intentionally separate future repositories.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script restrictions, use `npm.cmd`.

`npm run build` produces a static export in `out/`. Deploy this directory to a static host. No backend or credentials required.

## Routes

- `/` Home
- `/about/` About
- `/investments/` Filterable projects
- `/investments/mitali-cosmetic-bag-house/`, `/investments/ahnaf-enterprise/`, `/investments/getech/` Project details
- `/dashboard/profit/` Signed-in profit & cost sheet (data in `src/data/investments.js`)
- `/members/` Illustrative member profiles
- `/reports/` Period filter, chart, accounting summary, CSV download
- `/faq/` Accessible FAQ accordion
- `/contact/` Validated demo membership/contact form
- Custom 404 page

## Data and components

`lib/data.js` contains demo investments and FAQs. `components/` contains navigation, footer, brand, section headings, project cards, filters, report UI, contact form and accordion. Route pages live under `app/`. Global design tokens and responsive styling are in `app/globals.css`; Tailwind utilities are available throughout.

All figures, projects and member identities are illustrative. No login, payments, actual applications, persistent storage or financial transactions are implemented. Contact form validation is local and explicitly confirms that nothing was sent. Reports expose aggregate demo data only. Photos are representative external Unsplash assets; the Bengali font loads from Google Fonts, with local fallbacks.

## Future separate repositories

- Admin panel: authenticated overview, members, monthly deposits, dues, investment disbursements, repayments, profits/losses, expenses, withdrawals, statements, audit history, roles and settings.
- Backend: authentication, authorization, accounting ledger, member and investment APIs, validated transactions, reporting, audit logs, database and backups.

Keep real member balances and dues behind authenticated, authorized interfaces. Replace demo data only after connecting the independent backend.
