# FinTrack Dashboard

Frontend for [FinTrack API](https://github.com/CarlosAlbertoFurtado/fintrack-api). Shows your finances in charts and tables so you dont have to stare at raw JSON.

Built with Next.js 16, React 19, Recharts, and Tailwind.

## Running locally

```bash
git clone https://github.com/CarlosAlbertoFurtado/fintrack-dash.git
cd fintrack-dash
npm install
npm run dev
```

Goes to http://localhost:3000. Works with demo data out of the box — if the API is running it'll pull real data instead.

## Pages

- `/` — dashboard with summary cards, income vs expenses chart, category breakdown
- `/transactions` — table view with filters (all/income/expense)
- `/login` — auth form (connects to FinTrack API)

## Project structure

```
app/
├── page.tsx              # dashboard
├── login/page.tsx        # auth
└── transactions/page.tsx # table view
components/
├── Sidebar.tsx           # navigation
├── StatCard.tsx          # summary cards
├── TrendChart.tsx        # bar chart (recharts)
├── CategoryChart.tsx     # donut chart
├── TransactionList.tsx   # recent transactions
├── Skeleton.tsx          # loading states
└── ErrorBoundary.tsx     # error catching
hooks/
└── useDashboardData.ts   # data fetching + demo fallback
lib/
└── api.ts                # typed API client for fintrack
```

## Tests

```bash
npm test
```

Uses vitest + testing-library. Currently has tests for StatCard and TransactionList.

## What's missing

Stuff I want to add but haven't gotten to yet:

- [ ] Date range picker on dashboard
- [ ] Budget progress bars
- [ ] Dark/light toggle (everything is dark mode rn)
- [ ] Search on transactions page
- [ ] Better mobile layout — sidebar collapses but content still overflows on small screens

## Stack

Next.js 16 · React 19 · TypeScript · Recharts · Tailwind CSS · Vitest
