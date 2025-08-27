import React from 'react';
import { ArrowRight } from 'lucide-react';
import { mockProducts } from '../data/mock-data';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const { navigateTo } = useApp();
  
  const featuredProducts = mockProducts.filter(product => product.featured);

  return (
    <section id="featured-products" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of luxury items, crafted for those who appreciate 
            the finest in fashion and design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="transform hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('products')}
            className="btn-ghost-luxury group"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;