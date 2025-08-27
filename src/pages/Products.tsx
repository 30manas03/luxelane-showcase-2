import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { mockProducts, categories } from '../data/mock-data';
import { useApp } from '../context/AppContext';
import { Product, SortOption } from '../types';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { state, updateFilters } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(state.filters.search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: searchInput });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, updateFilters]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      // Search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (state.filters.categories.length > 0) {
        if (!state.filters.categories.includes(product.category)) {
          return false;
        }
      }

      // Price range filter
      const [minPrice, maxPrice] = state.filters.priceRange;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (state.filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // For demo, sort by ID (assuming higher ID = newer)
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [state.filters]);

  const handleCategoryToggle = (category: string) => {
    const currentCategories = state.filters.categories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    updateFilters({ categories: newCategories });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    const [currentMin, currentMax] = state.filters.priceRange;
    
    if (type === 'min') {
      updateFilters({ priceRange: [value, currentMax] });
    } else {
      updateFilters({ priceRange: [currentMin, value] });
    }
  };

  const clearFilters = () => {
    updateFilters({
      search: '',
      categories: [],
      priceRange: [0, 1500],
      sortBy: 'featured' as SortOption
    });
    setSearchInput('');
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Luxury Collection
          </h1>
          <p className="text-muted-foreground">
            Discover {filteredProducts.length} premium items in our curated collection
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-card-hover transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {(state.filters.categories.length > 0 || state.filters.search || 
                state.filters.priceRange[0] > 0 || state.filters.priceRange[1] < 1500) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={state.filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as SortOption })}
              className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-card-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.filters.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-card-foreground">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-card-foreground mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Min:</span>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={state.filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 'min')}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16">${state.filters.priceRange[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Max:</span>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={state.filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 'max')}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16">${state.filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="btn-accent"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;