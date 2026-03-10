import type { Transaction } from '@/lib/api'

interface Props {
    transactions: Transaction[]
}

export function TransactionList({ transactions }: Props) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Últimas Transações</h3>
            <div className="space-y-3">
                {transactions.slice(0, 8).map(tx => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                        <div>
                            <p className="text-sm text-zinc-200">{tx.description}</p>
                            <p className="text-xs text-zinc-500">
                                {new Date(tx.date).toLocaleDateString('pt-BR')}
                                {tx.is_recurring && <span className="ml-2 text-sky-400">↻ recorrente</span>}
                            </p>
                        </div>
                        <span className={`text-sm font-medium ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
