# FinTrack Dashboard

![CI](https://github.com/CarlosAlbertoFurtado/fintrack-dash/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/license-MIT-green)

Frontend dashboard for [FinTrack API](https://github.com/CarlosAlbertoFurtado/fintrack-api). Displays income/expense summaries, spending breakdown by category, monthly trends, and recent transactions.

Built with **Next.js**, **React**, **Recharts**, and **Tailwind CSS**.

---

## Quick start

```bash
git clone https://github.com/CarlosAlbertoFurtado/fintrack-dash.git
cd fintrack-dash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## How it works

The dashboard connects to the FinTrack API to fetch financial data. If the API is not running, it falls back to realistic demo data so you can still see the interface.

```
lib/api.ts         → typed API client (fetch wrapper)
hooks/             → custom React hooks for data loading
components/        → StatCard, TrendChart, CategoryChart, TransactionList
app/page.tsx       → main dashboard page
```

## Tech stack

| What | Why |
|------|-----|
| Next.js 16 | App Router, RSC, built-in optimizations |
| React 19 | Hooks, functional components |
| Recharts | Simple, composable chart library |
| Tailwind CSS | Utility-first, dark mode |
| TypeScript | Type safety across API responses |

## Known limitations / TODO

- [ ] Login page with JWT auth flow
- [ ] Budget progress bars
- [ ] Date range picker for filtering
- [ ] Responsive sidebar navigation
- [ ] Dark/light theme toggle

## License

MIT
