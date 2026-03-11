export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-zinc-800 rounded-lg ${className}`} />
    )
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <Skeleton className="lg:col-span-3 h-72" />
                <Skeleton className="lg:col-span-2 h-72" />
            </div>
            <Skeleton className="h-64" />
        </div>
    )
}
