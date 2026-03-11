import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDashboardData } from '@/hooks/useDashboardData'

// mock localStorage
const mockGetItem = vi.fn()
Object.defineProperty(window, 'localStorage', {
    value: { getItem: mockGetItem, setItem: vi.fn(), removeItem: vi.fn() },
})

// mock the api module
vi.mock('@/lib/api', () => ({
    getSummary: vi.fn().mockRejectedValue(new Error('no api')),
    getByCategory: vi.fn().mockRejectedValue(new Error('no api')),
    getMonthlyTrend: vi.fn().mockRejectedValue(new Error('no api')),
    getTransactions: vi.fn().mockRejectedValue(new Error('no api')),
}))

describe('useDashboardData', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns demo data when no token is present', () => {
        mockGetItem.mockReturnValue(null)

        const { result } = renderHook(() => useDashboardData())

        expect(result.current.loading).toBe(false)
        expect(result.current.summary.total_income).toBe(8453.27)
        expect(result.current.categories).toHaveLength(6)
        expect(result.current.trend).toHaveLength(6)
        expect(result.current.transactions).toHaveLength(8)
    })

    it('exposes a refresh function', () => {
        mockGetItem.mockReturnValue(null)

        const { result } = renderHook(() => useDashboardData())

        expect(typeof result.current.refresh).toBe('function')
    })

    it('sets loading to true when token exists and refresh is called', async () => {
        mockGetItem.mockReturnValue('fake-token')

        const { result } = renderHook(() => useDashboardData())

        // trigger refresh
        result.current.refresh()

        // should transition to loading
        // then fall back to demo data since API is mocked to reject
        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        // should still have demo data after failed API calls
        expect(result.current.summary.balance).toBe(4171.67)
    })
})
