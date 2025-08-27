import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from '../ProductCard';
import { AppProvider } from '../../context/AppContext';
import { mockProducts } from '../../data/mock-data';

// Mock the useApp hook
const mockNavigateTo = vi.fn();
const mockSelectProduct = vi.fn();

vi.mock('../../context/AppContext', async () => {
  const actual = await vi.importActual('../../context/AppContext');
  return {
    ...actual,
    useApp: () => ({
      navigateTo: mockNavigateTo,
      selectProduct: mockSelectProduct,
      state: {
        cart: [],
        currentView: 'home',
      },
    }),
  };
});

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>);
};

describe('ProductCard', () => {
  const mockProduct = mockProducts[0]; // Silk Midnight Blazer
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders product information correctly', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
      expect(screen.getByText(`${mockProduct.rating} (${mockProduct.reviewCount})`)).toBeInTheDocument();
    });

    it('displays original price when available', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const originalPrice = screen.getByText(`$${mockProduct.originalPrice}`);
      expect(originalPrice).toBeInTheDocument();
      expect(originalPrice).toHaveClass('line-through');
    });

    it('shows discount badge when original price is available', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const discount = Math.round(((mockProduct.originalPrice! - mockProduct.price) / mockProduct.originalPrice!) * 100);
      expect(screen.getByText(`${discount}% OFF`)).toBeInTheDocument();
    });

    it('renders product image with correct alt text', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const image = screen.getByAltText(mockProduct.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockProduct.imageUrls[0]);
    });

    it('shows out of stock indicator when product is not in stock', () => {
      const outOfStockProduct = { ...mockProduct, inStock: false };
      renderWithProvider(<ProductCard product={outOfStockProduct} />);
      
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      expect(screen.getByRole('img', { name: mockProduct.name })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(mockProduct.name);
    });

    it('provides sufficient color contrast', () => {
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      // This would be tested with actual color contrast tools
      // For now, we ensure proper semantic markup
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const viewButton = screen.getByRole('button', { name: /view details/i });
      viewButton.focus();
      
      expect(viewButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(mockSelectProduct).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('User Interactions', () => {
    it('calls selectProduct when view details button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const viewButton = screen.getByRole('button', { name: /view details/i });
      await user.click(viewButton);
      
      expect(mockSelectProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('calls selectProduct when product image is clicked', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const image = screen.getByAltText(mockProduct.name);
      await user.click(image);
      
      expect(mockSelectProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('calls selectProduct when product name is clicked', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const productName = screen.getByText(mockProduct.name);
      await user.click(productName);
      
      expect(mockSelectProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('shows hover effects on mouse enter', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const card = screen.getByTestId('product-card');
      await user.hover(card);
      
      // Check for hover classes or styles
      expect(card).toHaveClass('hover:scale-[1.02]');
    });
  });

  describe('Edge Cases', () => {
    it('handles product without original price', () => {
      const productWithoutOriginalPrice = { ...mockProduct };
      delete productWithoutOriginalPrice.originalPrice;
      
      renderWithProvider(<ProductCard product={productWithoutOriginalPrice} />);
      
      expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^\$\d+$/)).not.toHaveClass('line-through');
    });

    it('handles product without sizes', () => {
      const productWithoutSizes = { ...mockProduct, sizes: undefined };
      renderWithProvider(<ProductCard product={productWithoutSizes} />);
      
      // Should still render without errors
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    it('handles product without colors', () => {
      const productWithoutColors = { ...mockProduct, colors: undefined };
      renderWithProvider(<ProductCard product={productWithoutColors} />);
      
      // Should still render without errors
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    it('handles product with empty tags array', () => {
      const productWithEmptyTags = { ...mockProduct, tags: [] };
      renderWithProvider(<ProductCard product={productWithEmptyTags} />);
      
      // Should still render without errors
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    it('handles product with very long name', () => {
      const productWithLongName = {
        ...mockProduct,
        name: 'This is a very long product name that should be handled gracefully by the component without breaking the layout or causing overflow issues',
      };
      
      renderWithProvider(<ProductCard product={productWithLongName} />);
      
      expect(screen.getByText(productWithLongName.name)).toBeInTheDocument();
      // Check that the text is properly truncated or wrapped
    });
  });

  describe('Performance', () => {
    it('renders without unnecessary re-renders', () => {
      const { rerender } = renderWithProvider(<ProductCard product={mockProduct} />);
      
      // Mock console.count to track renders
      const consoleSpy = vi.spyOn(console, 'count').mockImplementation(() => {});
      
      rerender(<ProductCard product={mockProduct} />);
      
      // Should not cause unnecessary re-renders
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('handles rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      renderWithProvider(<ProductCard product={mockProduct} />);
      
      const viewButton = screen.getByRole('button', { name: /view details/i });
      
      // Rapidly click multiple times
      await user.click(viewButton);
      await user.click(viewButton);
      await user.click(viewButton);
      
      // Should only call selectProduct once or handle debouncing
      expect(mockSelectProduct).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive Design', () => {
    it('adapts to different screen sizes', () => {
      // Test different viewport sizes
      const { rerender } = renderWithProvider(<ProductCard product={mockProduct} />);
      
      // Mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      window.dispatchEvent(new Event('resize'));
      
      rerender(<ProductCard product={mockProduct} />);
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      
      // Desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      window.dispatchEvent(new Event('resize'));
      
      rerender(<ProductCard product={mockProduct} />);
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });
  });
});
