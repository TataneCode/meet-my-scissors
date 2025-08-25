import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import NeighborDetails from './neighbor-details';
import {useNeighborDetails} from './use-neighbor-details';

// Mock du hook useNeighborDetails
vi.mock('./use-neighbor-details', () => ({
    useNeighborDetails: vi.fn(),
}));

// Mock des textes
vi.mock('@/app/components/neighbors/neighbors.text', () => ({
    neighborDetailsText: {
        loading: 'Chargement...',
        error: 'Erreur lors du chargement',
        message: 'Aucun voisin trouvé pour l\'ID : ',
    },
}));

const mockUseNeighborDetails = vi.mocked(useNeighborDetails);

describe('NeighborDetails', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display loading state', () => {
        mockUseNeighborDetails.mockReturnValue({
            neighborDetails: undefined,
            loading: true,
            error: null,
        });

        render(<NeighborDetails neighborId="123"/>);

        expect(screen.getByText('Chargement...')).toBeInTheDocument();
    });

    it('should display error state', () => {
        mockUseNeighborDetails.mockReturnValue({
            neighborDetails: undefined,
            loading: false,
            error: 'Network error',
        });

        render(<NeighborDetails neighborId="123"/>);

        expect(screen.getByText('Erreur lors du chargement')).toBeInTheDocument();
    });

    it('should display no neighbor found message', () => {
        mockUseNeighborDetails.mockReturnValue({
            neighborDetails: undefined,
            loading: false,
            error: null,
        });

        render(<NeighborDetails neighborId="123"/>);

        expect(screen.getByText('Aucun voisin trouvé pour l\'ID : 123')).toBeInTheDocument();
    });

    it('should display neighbor details when loaded', () => {
        const mockNeighbor = {
            _id: '123',
            name: 'Alice Dupont',
            email: 'alice@example.com',
        };

        mockUseNeighborDetails.mockReturnValue({
            neighborDetails: mockNeighbor,
            loading: false,
            error: null,
        });

        render(<NeighborDetails neighborId="123"/>);

        expect(screen.getByText('Détail du voisin')).toBeInTheDocument();
        expect(screen.getByText('Alice Dupont')).toBeInTheDocument();
        expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });

    it('should call useNeighborDetails with correct neighborId', () => {
        mockUseNeighborDetails.mockReturnValue({
            neighborDetails: undefined,
            loading: true,
            error: null,
        });

        render(<NeighborDetails neighborId="test-id-456"/>);

        expect(mockUseNeighborDetails).toHaveBeenCalledWith('test-id-456');
        expect(mockUseNeighborDetails).toHaveBeenCalledTimes(1);
    });
});