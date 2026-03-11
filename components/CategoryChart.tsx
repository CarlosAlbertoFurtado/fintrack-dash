'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategoryBreakdown } from '@/lib/api'

const COLORS = ['#f472b6', '#818cf8', '#34d399', '#fbbf24', '#fb923c', '#a78bfa']

interface Props {
    data: CategoryBreakdown[]
}

export function CategoryChart({ data }: Props) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Gastos por Categoria</h3>
            <div className="flex items-center gap-4">
                <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="category_name"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            strokeWidth={0}
                        >
                            {data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
                            formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                    {data.map((cat, i) => (
                        <div key={cat.category_name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-zinc-300">{cat.category_name}</span>
                            </div>
                            <span className="text-zinc-500">{cat.percentage.toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
