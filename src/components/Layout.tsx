import React from 'react';
import { useApp } from '../context/AppContext';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

const Layout = () => {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;