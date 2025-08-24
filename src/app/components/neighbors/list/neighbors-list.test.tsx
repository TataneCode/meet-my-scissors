import { render, screen, waitFor } from '@testing-library/react';
import NeighborList from './neighbors-list';

describe('NeighborList', () => {
    beforeEach(() => {
        // mock global fetch
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [
                { _id: '1', name: 'Alice', email: 'alice@mail.com' },
                { _id: '2', name: 'Bob', email: 'bob@mail.com' },
            ],
        }) as never;
    });

    it('renders neighbors from API', async () => {
        render(<NeighborList />);

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        });
    });
});
