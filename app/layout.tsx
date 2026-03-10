import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinTrack Dashboard',
  description: 'Personal finance dashboard — income, expenses, budgets, and spending insights',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 antialiased">{children}</body>
    </html>
  )
}
