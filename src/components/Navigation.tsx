import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, User, Sun, Moon, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { state, navigateTo, getCartItemCount, toggleTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = getCartItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('products');
      // The search filtering will be handled in the Products component
    }
  };

  const navigationItems = [
    { label: 'Home', action: () => navigateTo('home') },
    { label: 'Products', action: () => navigateTo('products') },
    { label: 'Profile', action: () => navigateTo('profile') }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <h1 className="text-2xl font-bold text-gradient">LuxeLane</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    state.currentView === item.label.toLowerCase()
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('products')}
                className="btn-accent hidden lg:inline-flex items-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search luxury items..."
                className="w-full pl-4 pr-10 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-muted hover:bg-muted-dark transition-colors"
            >
              {state.theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {/* Profile - Desktop */}
            <button
              onClick={() => navigateTo('profile')}
              className="hidden md:flex items-center space-x-2 text-foreground hover:text-accent transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{state.user?.name}</span>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative p-2 text-foreground hover:text-accent transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search luxury items..."
                  className="w-full pl-4 pr-10 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                    state.currentView === item.label.toLowerCase()
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Profile */}
              <button
                onClick={() => {
                  navigateTo('profile');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-foreground hover:text-accent transition-colors"
              >
                <User className="h-5 w-5" />
                <span>{state.user?.name}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;