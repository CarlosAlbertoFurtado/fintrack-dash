'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/', label: 'Dashboard', icon: '◉' },
    { href: '/transactions', label: 'Transações', icon: '⇄' },
    // { href: '/budgets', label: 'Orçamentos', icon: '◎' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-52 border-r border-zinc-800 bg-zinc-950 min-h-screen px-3 py-6 hidden md:block">
            <div className="mb-8 px-3">
                <h2 className="text-sm font-semibold text-zinc-100">FinTrack</h2>
                <p className="text-[10px] text-zinc-600">v0.1.0</p>
            </div>

            <nav className="space-y-1">
                {links.map(link => {
                    const active = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active
                                    ? 'bg-zinc-800 text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                                }`}
                        >
                            <span className="text-xs">{link.icon}</span>
                            {link.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto pt-8 px-3">
                <p className="text-[10px] text-zinc-700">
                    Conectado à FinTrack API
                </p>
            </div>
        </aside>
    )
}
