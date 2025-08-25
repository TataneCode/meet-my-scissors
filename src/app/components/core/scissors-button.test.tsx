import {render, screen} from '@testing-library/react';
import ScissorsButton from './scissors-button';

describe('ScissorsButton', () => {
    it('applies base classes for styling and behavior', () => {
        render(<ScissorsButton text="Base Classes"/>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('flex items-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none');
    });

    it('renders icon with flex-shrink-0 class when icon is provided', () => {
        render(<ScissorsButton text="With Icon" icon={<span data-testid="test-icon">🔧</span>}/>);
        const iconContainer = screen.getByTestId('test-icon').parentElement;
        expect(iconContainer?.className).toContain('flex-shrink-0');
    });

    it('applies the correct size classes for small size', () => {
        render(<ScissorsButton text="Small Button" size="small"/>);
        expect(screen.getByRole('button').className).toContain('px-2 py-1 text-sm');
    });

    it('applies the correct variant classes for important variant', () => {
        render(<ScissorsButton text="Important Button" variant="important"/>);
        expect(screen.getByRole('button').className).toContain('bg-emerald-300 hover:bg-emerald-400 text-emerald-900');
    });

    it('disables the button when disabled is true', () => {
        render(<ScissorsButton text="Disabled Button" disabled/>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies additional className when provided', () => {
        render(<ScissorsButton text="Custom Class" className="custom-class"/>);
        expect(screen.getByRole('button').className).toContain('custom-class');
    });

    it('renders text content correctly', () => {
        render(<ScissorsButton text="Test Button"/>);
        expect(screen.getByRole('button')).toHaveTextContent('Test Button');
    });
});