'use client'

import { useState } from 'react'
import { login } from '@/lib/api'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        try {
            const res = await login(email, password)
            localStorage.setItem('token', res.access_token)
            localStorage.setItem('user', JSON.stringify(res.user))
            window.location.href = '/'
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-xl font-semibold text-zinc-100 mb-1">FinTrack</h1>
                <p className="text-sm text-zinc-500 mb-8">Entre para acessar o dashboard</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm text-zinc-400 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-zinc-400 mb-1">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-rose-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {submitting ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className="text-xs text-zinc-600 mt-6 text-center">
                    Sem conta? O dashboard funciona com dados demo.{' '}
                    <a href="/" className="text-zinc-400 hover:text-zinc-300">Ir para demo →</a>
                </p>
            </div>
        </div>
    )
}
