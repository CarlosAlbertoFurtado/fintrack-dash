import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '@/components/ErrorBoundary'

function BrokenComponent(): JSX.Element {
    throw new Error('test crash')
}

function WorkingComponent() {
    return <p>tudo certo</p>
}

describe('ErrorBoundary', () => {
    // suppress console.error noise from the thrown error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => { })

    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <WorkingComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText('tudo certo')).toBeInTheDocument()
    })

    it('renders fallback UI when child throws', () => {
        render(
            <ErrorBoundary>
                <BrokenComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
        expect(screen.getByText('test crash')).toBeInTheDocument()
        expect(screen.getByText('Tentar novamente')).toBeInTheDocument()
    })

    it('renders custom fallback when provided', () => {
        render(
            <ErrorBoundary fallback={<p>custom error</p>}>
                <BrokenComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText('custom error')).toBeInTheDocument()
    })

    spy.mockRestore()
})
