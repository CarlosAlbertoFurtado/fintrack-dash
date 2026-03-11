'use client'

import { useState, useCallback } from 'react'
import { getSummary, getByCategory, getMonthlyTrend, getTransactions } from '@/lib/api'
import type { SummaryResponse, CategoryBreakdown, MonthlyTrend, Transaction } from '@/lib/api'

const DEMO_SUMMARY: SummaryResponse = {
    total_income: 8453.27,
    total_expenses: 4281.60,
    balance: 4171.67,
}

const DEMO_CATEGORIES: CategoryBreakdown[] = [
    { category_name: 'Alimentação', total: 1240.00, percentage: 29.0, count: 34 },
    { category_name: 'Transporte', total: 680.50, percentage: 15.9, count: 22 },
    { category_name: 'Moradia', total: 1500.00, percentage: 35.0, count: 1 },
    { category_name: 'Lazer', total: 420.00, percentage: 9.8, count: 8 },
    { category_name: 'Saúde', total: 280.00, percentage: 6.5, count: 3 },
    { category_name: 'Educação', total: 160.00, percentage: 3.7, count: 2 },
]

const DEMO_TREND: MonthlyTrend[] = [
    { month: '2025-10', income: 7200, expenses: 3800 },
    { month: '2025-11', income: 7200, expenses: 4100 },
    { month: '2025-12', income: 8900, expenses: 5200 },
    { month: '2026-01', income: 7200, expenses: 3600 },
    { month: '2026-02', income: 7500, expenses: 4000 },
    { month: '2026-03', income: 8450, expenses: 4280 },
]

const DEMO_TRANSACTIONS: Transaction[] = [
    { id: '1', description: 'Salário', amount: 7200, type: 'INCOME', category_id: null, date: '2026-03-05T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-05' },
    { id: '2', description: 'Freelance - Landing page', amount: 1250, type: 'INCOME', category_id: null, date: '2026-03-08T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-08' },
    { id: '3', description: 'Aluguel', amount: 1500, type: 'EXPENSE', category_id: 'cat-moradia', date: '2026-03-01T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-01' },
    { id: '4', description: 'Supermercado Extra', amount: 342.80, type: 'EXPENSE', category_id: 'cat-alimentacao', date: '2026-03-03T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-03' },
    { id: '5', description: 'Uber - trabalho', amount: 28.50, type: 'EXPENSE', category_id: 'cat-transporte', date: '2026-03-04T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-04' },
    { id: '6', description: 'Netflix', amount: 55.90, type: 'EXPENSE', category_id: 'cat-lazer', date: '2026-03-05T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-05' },
    { id: '7', description: 'Farmácia', amount: 89.00, type: 'EXPENSE', category_id: 'cat-saude', date: '2026-03-06T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-06' },
    { id: '8', description: 'Curso Udemy', amount: 27.90, type: 'EXPENSE', category_id: 'cat-educacao', date: '2026-03-07T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-07' },
]

interface DashboardData {
    loading: boolean
    summary: SummaryResponse
    categories: CategoryBreakdown[]
    trend: MonthlyTrend[]
    transactions: Transaction[]
    refresh: () => void
}

export function useDashboardData(): DashboardData {
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState<SummaryResponse>(DEMO_SUMMARY)
    const [categories, setCategories] = useState<CategoryBreakdown[]>(DEMO_CATEGORIES)
    const [trend, setTrend] = useState<MonthlyTrend[]>(DEMO_TREND)
    const [transactions, setTransactions] = useState<Transaction[]>(DEMO_TRANSACTIONS)

    const refresh = useCallback(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) return

        console.log('[dashboard] refreshing data...')
        setLoading(true)

        const now = new Date()
        const dateFrom = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const dateTo = now.toISOString()

        Promise.all([
            getSummary(token, dateFrom, dateTo).catch(() => DEMO_SUMMARY),
            getByCategory(token, dateFrom, dateTo).catch(() => DEMO_CATEGORIES),
            getMonthlyTrend(token).catch(() => DEMO_TREND),
            getTransactions(token).then(r => r.data).catch(() => DEMO_TRANSACTIONS),
        ]).then(([s, c, t, tx]) => {
            setSummary(s)
            setCategories(c)
            setTrend(t)
            setTransactions(tx)
            setLoading(false)
        })
    }, [])

    return { loading, summary, categories, trend, transactions, refresh }
}
