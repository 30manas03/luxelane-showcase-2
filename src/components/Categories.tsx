import React from 'react';
import { categories } from '../data/mock-data';
import { useApp } from '../context/AppContext';

const Categories = () => {
  const { navigateTo, updateFilters } = useApp();

  const handleCategoryClick = (category: string) => {
    updateFilters({ categories: [category] });
    navigateTo('products');
  };

  // Category icons mapping
  const categoryIcons: { [key: string]: string } = {
    'Blazers': '👔',
    'Sweaters': '🧥',
    'Dresses': '👗',
    'Jewelry': '💎',
    'Bags': '👜',
    'Accessories': '🕶️',
    'Fragrance': '🌸',
    'Watches': '⌚',
    'Footwear': '👟',
    'Outerwear': '🧥'
  };

  // Optional category image avatars (looked up at runtime)
  const categoryImages: { [key: string]: string } = {
    'Watches': '/src/assets/category-watches.jpg',
    'Footwear': '/src/assets/category-footwear.jpg',
    'Outerwear': '/src/assets/category-outerwear.jpg',
    // Use existing local assets to guarantee display
    'Blazers': '/src/assets/blazer-main.jpg',
    'Sweaters': '/src/assets/sweater-main.jpg',
    'Dresses': '/src/assets/dress-main.jpg',
    'Jewelry': '/src/assets/necklace-main.jpg',
    'Bags': '/src/assets/handbag-main.jpg',
    'Accessories': '/src/assets/sunglasses-main.jpg',
    'Fragrance': '/src/assets/perfume-main.jpg'
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections across luxury fashion categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="card-luxury group p-6 text-center hover:shadow-hover transition-all duration-300 hover:scale-105"
            >
              {/* Avatar/Image or Emoji Icon */}
              {categoryImages[category] ? (
                <div className="mb-4 mx-auto h-16 w-16 rounded-full overflow-hidden shadow-card group-hover:shadow-hover transition-shadow">
                  <img
                    src={categoryImages[category]}
                    alt={`${category} avatar`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[category] || '✨'}
                </div>
              )}
              
              {/* Category Name */}
              <h3 className="font-semibold text-card-foreground group-hover:text-accent transition-colors">
                {category}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;