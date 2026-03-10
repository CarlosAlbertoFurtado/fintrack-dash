interface StatCardProps {
    title: string
    value: string
    subtitle?: string
    trend?: 'up' | 'down' | 'neutral'
    color?: 'green' | 'red' | 'blue'
}

export function StatCard({ title, value, subtitle, trend, color = 'blue' }: StatCardProps) {
    const colorMap = {
        green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
        red: 'from-rose-500/20 to-rose-500/5 border-rose-500/30',
        blue: 'from-sky-500/20 to-sky-500/5 border-sky-500/30',
    }

    const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''

    return (
        <div className={`rounded-xl border bg-gradient-to-br p-5 ${colorMap[color]}`}>
            <p className="text-sm text-zinc-400 mb-1">{title}</p>
            <p className="text-2xl font-semibold text-zinc-100">
                {value}
                {trendIcon && (
                    <span className={`text-sm ml-2 ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trendIcon}
                    </span>
                )}
            </p>
            {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
        </div>
    )
}
