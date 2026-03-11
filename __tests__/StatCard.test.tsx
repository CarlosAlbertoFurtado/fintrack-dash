import { render, screen } from '@testing-library/react'
import { StatCard } from '@/components/StatCard'

describe('StatCard', () => {
    it('renders title and value', () => {
        render(<StatCard title="Receitas" value="R$ 8.450,00" />)
        expect(screen.getByText('Receitas')).toBeInTheDocument()
        expect(screen.getByText('R$ 8.450,00')).toBeInTheDocument()
    })

    it('shows trend arrow when provided', () => {
        render(<StatCard title="Receitas" value="R$ 8.450,00" trend="up" color="green" />)
        expect(screen.getByText('↑')).toBeInTheDocument()
    })

    it('shows subtitle when provided', () => {
        render(<StatCard title="Saldo" value="R$ 4.169,50" subtitle="líquido" />)
        expect(screen.getByText('líquido')).toBeInTheDocument()
    })

    it('renders without optional props', () => {
        render(<StatCard title="Test" value="123" />)
        expect(screen.getByText('Test')).toBeInTheDocument()
        // no trend arrow should be rendered
        expect(screen.queryByText('↑')).not.toBeInTheDocument()
        expect(screen.queryByText('↓')).not.toBeInTheDocument()
    })
})
