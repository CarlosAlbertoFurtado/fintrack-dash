'use client'

import { StatCard } from '@/components/StatCard'
import { TrendChart } from '@/components/TrendChart'
import { CategoryChart } from '@/components/CategoryChart'
import { TransactionList } from '@/components/TransactionList'
import { DashboardSkeleton } from '@/components/Skeleton'
import { useDashboardData } from '@/hooks/useDashboardData'

export default function Dashboard() {
  const { loading, summary, categories, trend, transactions } = useDashboardData()

  if (loading) {
    return <DashboardSkeleton />
  }

  const fmt = (n: number) => `R$ ${n.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Visão geral</h2>
        {/* TODO: add date range picker here */}
        <span className="text-xs text-zinc-600">Março 2026</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Receitas" value={fmt(summary.total_income)} trend="up" color="green" subtitle="este mês" />
        <StatCard title="Despesas" value={fmt(summary.total_expenses)} trend="down" color="red" subtitle="este mês" />
        <StatCard title="Saldo" value={fmt(summary.balance)} color="blue" subtitle="líquido" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <TrendChart data={trend} />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart data={categories} />
        </div>
      </div>

      <TransactionList transactions={transactions} />
    </div>
  )
}
