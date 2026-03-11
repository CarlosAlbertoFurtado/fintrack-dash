import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'FinTrack Dashboard',
  description: 'Personal finance dashboard — income, expenses, budgets, and spending insights',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 antialiased">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
