import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, ShoppingBag, Minus, Plus } from 'lucide-react';
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

const ProductDetail = () => {
  const { state, navigateTo, addToCart } = useApp();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = state.selectedProduct;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <button onClick={() => navigateTo('products')} className="btn-accent">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for this product.",
        variant: "destructive",
      });
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "Color selection is required for this product.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const productImages = product.imageUrls.map(url => imageMap[url] || url);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('products')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-accent'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-accent" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Share2 className="h-5 w-5 text-muted-foreground hover:text-accent" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded">
                      SALE
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full btn-luxury flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Stock:</span>
                  <span className={product.inStock ? 'text-success' : 'text-destructive'}>
                    {product.inStock ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground">{product.category}</span>
                </div>
                {product.tags.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tags:</span>
                    <span className="text-foreground">{product.tags.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;