import React from 'react';
import { User, Package, Heart, Settings, MapPin, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockOrders } from '../data/mock-data';
import userAvatar from '../assets/user-avatar.jpg';

const Profile = () => {
  const { state, navigateTo } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-accent bg-accent/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-luxury p-6 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <h2 className="text-xl font-bold text-card-foreground mb-2">
                {state.user?.name}
              </h2>
              <p className="text-muted-foreground mb-6">{state.user?.email}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {mockOrders.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">VIP</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-card-hover transition-colors">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span>Account Settings</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-card-hover transition-colors">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Shipping Addresses</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-card-hover transition-colors">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span>Payment Methods</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-card-hover transition-colors">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="card-luxury p-6">
              <h1 className="text-3xl font-bold text-card-foreground mb-4">
                Welcome back, {state.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for being a valued LuxeLane customer. Here's an overview of your account.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => navigateTo('products')}
                  className="btn-accent"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigateTo('cart')}
                  className="btn-ghost-luxury"
                >
                  View Cart
                </button>
                <button className="btn-ghost-luxury">
                  Track Orders
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">Recent Orders</h2>
                <button className="text-accent hover:text-accent/80 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-card-hover transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-card-foreground">
                            Order #{order.id}
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {formatDate(order.orderDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expected delivery: {formatDate(order.estimatedDelivery)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-card-foreground">
                          {formatPrice(order.total)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="border-t border-border pt-3">
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-card-foreground">
                              {item.quantity}x {item.product.name}
                            </span>
                            {item.selectedSize && (
                              <span className="text-muted-foreground">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="text-muted-foreground">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <button className="text-accent hover:text-accent/80 transition-colors text-sm">
                        Track Package
                      </button>
                      <button className="text-accent hover:text-accent/80 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {mockOrders.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    No orders yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start shopping to see your orders here
                  </p>
                  <button
                    onClick={() => navigateTo('products')}
                    className="btn-accent"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Account Information */}
            <div className="card-luxury p-6">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">
                Account Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-card-foreground mb-3">Personal Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="text-card-foreground">{state.user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-card-foreground">{state.user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since:</span>
                      <span className="text-card-foreground">January 2024</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-card-foreground mb-3">Preferences</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Newsletter:</span>
                      <span className="text-success">Subscribed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SMS Updates:</span>
                      <span className="text-success">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="text-card-foreground">English</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;