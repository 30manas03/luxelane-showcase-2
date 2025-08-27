import React from 'react';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
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

const imageMap: { [key: string]: string } = {
  '/src/assets/blazer-main.jpg': blazerMain,
  '/src/assets/sweater-main.jpg': sweaterMain,
  '/src/assets/necklace-main.jpg': necklaceMain,
  '/src/assets/handbag-main.jpg': handbagMain,
  '/src/assets/perfume-main.jpg': perfumeMain,
  '/src/assets/dress-main.jpg': dressMain,
  '/src/assets/scarf-main.jpg': scarfMain,
  '/src/assets/sunglasses-main.jpg': sunglassesMain,
};

const Cart = () => {
  const { state, navigateTo, removeFromCart, updateCartQuantity, clearCart, getCartTotal } = useApp();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout Started",
      description: "This is a demo. In a real app, this would proceed to payment.",
    });
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 25; // Free shipping over $500
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigateTo('products')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>

          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Discover our luxury collection and add items to your cart
            </p>
            <button onClick={() => navigateTo('products')} className="btn-luxury">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('products')}
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
          <button
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            
            <div className="space-y-4">
              {state.cart.map((item, index) => {
                const productImage = imageMap[item.product.imageUrls[0]] || item.product.imageUrls[0];
                
                return (
                  <div key={`${item.product.id}-${index}`} className="card-luxury p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div 
                        className="w-full sm:w-32 h-32 flex-shrink-0 cursor-pointer"
                        onClick={() => {
                          // Navigate to product detail
                          navigateTo('product-detail');
                        }}
                      >
                        <img
                          src={productImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-card-foreground text-lg">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.product.category}</p>
                            
                            {/* Selected Options */}
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 border border-border rounded hover:bg-muted transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 border border-border rounded hover:bg-muted transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg text-card-foreground">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">
                                {formatPrice(item.product.price)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-luxury p-6 sticky top-8">
              <h2 className="text-xl font-bold text-card-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {/* Free Shipping Message */}
                {shipping > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Add {formatPrice(500 - subtotal)} more for free shipping
                  </div>
                )}

                {/* Tax */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-card-foreground">Total</span>
                    <span className="text-xl font-bold text-card-foreground">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full btn-luxury mt-6"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure checkout with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;