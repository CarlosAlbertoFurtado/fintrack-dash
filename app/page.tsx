'use client'

import { StatCard } from '@/components/StatCard'
import { TrendChart } from '@/components/TrendChart'
import { CategoryChart } from '@/components/CategoryChart'
import { TransactionList } from '@/components/TransactionList'
import { useDashboardData } from '@/hooks/useDashboardData'

export default function Dashboard() {
  const { loading, summary, categories, trend, transactions } = useDashboardData()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Carregando...</div>
      </div>
    )
  }

  const incomeFormatted = `R$ ${summary.total_income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  const expenseFormatted = `R$ ${summary.total_expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  const balanceFormatted = `R$ ${summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">FinTrack</h1>
            <p className="text-xs text-zinc-500">Dashboard de finanças pessoais</p>
          </div>
          {/* TODO: add date range picker here */}
          <div className="text-xs text-zinc-600">
            Março 2026
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Receitas" value={incomeFormatted} trend="up" color="green" subtitle="este mês" />
          <StatCard title="Despesas" value={expenseFormatted} trend="down" color="red" subtitle="este mês" />
          <StatCard title="Saldo" value={balanceFormatted} color="blue" subtitle="líquido" />
        </div>

        {/* charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <TrendChart data={trend} />
          </div>
          <div className="lg:col-span-2">
            <CategoryChart data={categories} />
          </div>
        </div>

        {/* transactions */}
        <TransactionList transactions={transactions} />
      </main>
    </div>
  )
}
