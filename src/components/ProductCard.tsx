import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useToast } from '../hooks/use-toast';

// Import product images
import blazerMain from '../assets/blazer-main.jpg';
import sweaterMain from '../assets/sweater-main.jpg';
import necklaceMain from '../assets/necklace-main.jpg';
import handbagMain from '../assets/handbag-main.jpg';
import perfumeMain from '../assets/perfume-main.jpg';
import dressMain from '../assets/dress-main.jpg';
import scarfMain from '../assets/scarf-main.jpg';
import sunglassesMain from '../assets/sunglasses-main.jpg';
import watchMain from '../assets/watch-main.jpg';

const imageMap: { [key: string]: string } = {
  '/src/assets/blazer-main.jpg': blazerMain,
  '/src/assets/sweater-main.jpg': sweaterMain,
  '/src/assets/necklace-main.jpg': necklaceMain,
  '/src/assets/handbag-main.jpg': handbagMain,
  '/src/assets/perfume-main.jpg': perfumeMain,
  '/src/assets/dress-main.jpg': dressMain,
  '/src/assets/scarf-main.jpg': scarfMain,
  '/src/assets/sunglasses-main.jpg': sunglassesMain,
  '/src/assets/watch-main.jpg': watchMain,
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { selectProduct, addToCart } = useApp();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleProductClick = () => {
    selectProduct(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const productImage = imageMap[product.imageUrls[0]] || product.imageUrls[0];

  return (
    <div
      className={`card-product cursor-pointer group hover:border-accent/40 ${className}`}
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-card rounded-full shadow-card hover:bg-card-hover transition-colors">
            <Heart className="h-4 w-4 text-muted-foreground hover:text-accent" />
          </button>
        </div>

        {/* Sale Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold">
            SALE
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-semibold">
            FEATURED
          </div>
        )}

        {/* Add to Cart Button - Appears on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full btn-accent flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-card-foreground group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-accent fill-current'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-card-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Colors Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{
                    backgroundColor: color.toLowerCase().includes('black') ? '#000000' :
                                   color.toLowerCase().includes('white') ? '#ffffff' :
                                   color.toLowerCase().includes('blue') ? '#1e40af' :
                                   color.toLowerCase().includes('red') ? '#dc2626' :
                                   color.toLowerCase().includes('green') ? '#16a34a' :
                                   color.toLowerCase().includes('brown') || color.toLowerCase().includes('cognac') ? '#92400e' :
                                   color.toLowerCase().includes('gold') ? '#d97706' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;