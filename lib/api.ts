const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface RequestOptions {
    method?: string
    body?: unknown
    token?: string
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (opts.token) {
        headers['Authorization'] = `Bearer ${opts.token}`
    }

    const res = await fetch(`${API_URL}${path}`, {
        method: opts.method || 'GET',
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Request failed' }))
        throw new Error(err.detail || `HTTP ${res.status}`)
    }

    return res.json()
}

// auth
export async function login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: { email, password },
    })
}

// transactions
export async function getTransactions(token: string, params?: URLSearchParams) {
    const qs = params ? `?${params}` : ''
    return request<PaginatedResponse>(`/transactions${qs}`, { token })
}

// reports
export async function getSummary(token: string, dateFrom: string, dateTo: string) {
    return request<SummaryResponse>(`/reports/summary?date_from=${dateFrom}&date_to=${dateTo}`, { token })
}

export async function getByCategory(token: string, dateFrom: string, dateTo: string) {
    return request<CategoryBreakdown[]>(`/reports/by-category?date_from=${dateFrom}&date_to=${dateTo}`, { token })
}

export async function getMonthlyTrend(token: string, months = 6) {
    return request<MonthlyTrend[]>(`/reports/monthly-trend?months=${months}`, { token })
}

export async function getBudgets(token: string, month: number, year: number) {
    return request<BudgetResponse>(`/budgets?month=${month}&year=${year}`, { token })
}

// types
export interface AuthResponse {
    user: { id: string; email: string; name: string; role: string }
    access_token: string
    refresh_token: string
}

export interface Transaction {
    id: string
    description: string
    amount: number
    type: 'INCOME' | 'EXPENSE'
    category_id: string | null
    date: string
    notes: string | null
    is_recurring: boolean
    created_at: string
}

export interface PaginatedResponse {
    data: Transaction[]
    total: number
    page: number
    limit: number
    total_pages: number
}

export interface SummaryResponse {
    total_income: number
    total_expenses: number
    balance: number
}

export interface CategoryBreakdown {
    category_name: string
    total: number
    percentage: number
    count: number
}

export interface MonthlyTrend {
    month: string
    income: number
    expenses: number
}

export interface Budget {
    id: string
    category_id: string
    category_name?: string
    amount: number
    spent: number
    month: number
    year: number
}

export interface BudgetResponse {
    data: Budget[]
}
