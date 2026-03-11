'use client'

import { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

// had a bug where the whole page would crash when the API returned
// unexpected data. this catches those cases now
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error) {
        // TODO: send to sentry or similar
        console.error('[ErrorBoundary]', error.message)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center">
                    <p className="text-sm text-rose-400 mb-1">Algo deu errado</p>
                    <p className="text-xs text-zinc-500">{this.state.error?.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="mt-3 text-xs text-zinc-400 hover:text-zinc-200 underline"
                    >
                        Tentar novamente
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
