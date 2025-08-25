import { renderHook, waitFor } from '@testing-library/react';
import { useNeighbors } from './use-neighbors';
import { getNeighbors } from '@/app/client/neighbors.client';
import { vi } from 'vitest';

// Mock du module client
vi.mock('@/app/client/neighbors.client', () => ({
    getNeighbors: vi.fn(),
}));

const mockGetNeighbors = vi.mocked(getNeighbors);

describe('useNeighbors', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return neighbors when API call succeeds', async () => {
        const mockNeighbors = [
            { _id: '1', name: 'Alice', email: 'alice@mail.com' },
            { _id: '2', name: 'Bob', email: 'bob@mail.com' },
        ];

        mockGetNeighbors.mockResolvedValue(mockNeighbors);

        const { result } = renderHook(() => useNeighbors());

        expect(result.current.loading).toBe(true);
        expect(result.current.neighbors).toEqual([]);
        expect(result.current.error).toBe(null);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.neighbors).toEqual(mockNeighbors);
        expect(result.current.error).toBe(null);
        expect(mockGetNeighbors).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors', async () => {
        const errorMessage = 'API Error';
        mockGetNeighbors.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useNeighbors());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.neighbors).toEqual([]);
        expect(result.current.error).toBe(errorMessage);
    });
});