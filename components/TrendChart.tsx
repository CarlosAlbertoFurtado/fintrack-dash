'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { MonthlyTrend } from '@/lib/api'

interface Props {
    data: MonthlyTrend[]
}

export function TrendChart({ data }: Props) {
    const formatted = data.map(d => ({
        month: d.month.slice(5), // "03" from "2026-03"
        Receitas: d.income,
        Despesas: d.expenses,
    }))

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Receitas vs Despesas</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={formatted} barGap={4}>
                    <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                        contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
                        labelStyle={{ color: '#a1a1aa' }}
                        formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Receitas" fill="#34d399" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Despesas" fill="#fb7185" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
