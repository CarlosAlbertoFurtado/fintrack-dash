import { render, screen } from '@testing-library/react'
import { TransactionList } from '@/components/TransactionList'
import type { Transaction } from '@/lib/api'

const mockTransactions: Transaction[] = [
    {
        id: '1',
        description: 'Salário',
        amount: 7200,
        type: 'INCOME',
        category_id: null,
        date: '2026-03-05T00:00:00',
        notes: null,
        is_recurring: true,
        created_at: '2026-03-05',
    },
    {
        id: '2',
        description: 'Aluguel',
        amount: 1500,
        type: 'EXPENSE',
        category_id: 'cat-moradia',
        date: '2026-03-01T00:00:00',
        notes: null,
        is_recurring: true,
        created_at: '2026-03-01',
    },
]

describe('TransactionList', () => {
    it('renders transaction descriptions', () => {
        render(<TransactionList transactions={mockTransactions} />)
        expect(screen.getByText('Salário')).toBeInTheDocument()
        expect(screen.getByText('Aluguel')).toBeInTheDocument()
    })

    it('shows recurring label', () => {
        render(<TransactionList transactions={mockTransactions} />)
        // both are recurring
        const badges = screen.getAllByText('↻ recorrente')
        expect(badges).toHaveLength(2)
    })

    it('renders empty list without crashing', () => {
        render(<TransactionList transactions={[]} />)
        expect(screen.getByText('Últimas Transações')).toBeInTheDocument()
    })
})
