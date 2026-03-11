'use client'

import { useState } from 'react'
import type { Transaction } from '@/lib/api'

// using the same demo data from the hook — in prod this would be its own API call
const DEMO: Transaction[] = [
    { id: '1', description: 'Salário', amount: 7200, type: 'INCOME', category_id: null, date: '2026-03-05T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-05' },
    { id: '2', description: 'Freelance - Landing page', amount: 1250, type: 'INCOME', category_id: null, date: '2026-03-08T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-08' },
    { id: '3', description: 'Aluguel', amount: 1500, type: 'EXPENSE', category_id: 'cat-moradia', date: '2026-03-01T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-01' },
    { id: '4', description: 'Supermercado Extra', amount: 342.80, type: 'EXPENSE', category_id: 'cat-alimentacao', date: '2026-03-03T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-03' },
    { id: '5', description: 'Uber - trabalho', amount: 28.50, type: 'EXPENSE', category_id: 'cat-transporte', date: '2026-03-04T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-04' },
    { id: '6', description: 'Netflix', amount: 55.90, type: 'EXPENSE', category_id: 'cat-lazer', date: '2026-03-05T00:00:00', notes: null, is_recurring: true, created_at: '2026-03-05' },
    { id: '7', description: 'Farmácia', amount: 89.00, type: 'EXPENSE', category_id: 'cat-saude', date: '2026-03-06T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-06' },
    { id: '8', description: 'Curso Udemy', amount: 27.90, type: 'EXPENSE', category_id: 'cat-educacao', date: '2026-03-07T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-07' },
    { id: '9', description: 'iFood', amount: 67.40, type: 'EXPENSE', category_id: 'cat-alimentacao', date: '2026-03-08T00:00:00', notes: 'pizza sexta', is_recurring: false, created_at: '2026-03-08' },
    { id: '10', description: 'Gasolina', amount: 210.00, type: 'EXPENSE', category_id: 'cat-transporte', date: '2026-03-09T00:00:00', notes: null, is_recurring: false, created_at: '2026-03-09' },
]

type Filter = 'all' | 'INCOME' | 'EXPENSE'

export default function TransactionsPage() {
    const [filter, setFilter] = useState<Filter>('all')

    const filtered = filter === 'all' ? DEMO : DEMO.filter(t => t.type === filter)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-100">Transações</h2>
                <div className="flex gap-1">
                    {(['all', 'INCOME', 'EXPENSE'] as Filter[]).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${filter === f
                                    ? 'bg-zinc-700 text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {f === 'all' ? 'Todas' : f === 'INCOME' ? 'Receitas' : 'Despesas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* TODO: add search input here eventually */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-left">
                            <th className="px-4 py-3 font-medium">Descrição</th>
                            <th className="px-4 py-3 font-medium">Data</th>
                            <th className="px-4 py-3 font-medium text-right">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(tx => (
                            <tr key={tx.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                                <td className="px-4 py-3">
                                    <span className="text-zinc-200">{tx.description}</span>
                                    {tx.is_recurring && (
                                        <span className="ml-2 text-[10px] text-sky-400/70">recorrente</span>
                                    )}
                                    {tx.notes && (
                                        <span className="ml-2 text-[10px] text-zinc-600">({tx.notes})</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-zinc-500">
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className={`px-4 py-3 text-right font-medium ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-zinc-700">
                {filtered.length} transaç{filtered.length === 1 ? 'ão' : 'ões'}
                {filter !== 'all' && ` (filtrado)`}
            </p>
        </div>
    )
}
