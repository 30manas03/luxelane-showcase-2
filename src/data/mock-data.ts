import { Product, User, Order } from '../types';

// Mock product data for LuxeLane
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Midnight Blazer',
    price: 399,
    originalPrice: 499,
    category: 'Blazers',
    description: 'Elevate your wardrobe with this luxurious silk blazer featuring a contemporary cut and exquisite craftsmanship. Perfect for evening events and professional settings.',
    imageUrls: [
      '/src/assets/blazer-main.jpg',
      '/src/assets/blazer-detail.jpg',
      '/src/assets/blazer-back.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Midnight Blue', 'Charcoal', 'Black'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 127,
    tags: ['luxury', 'formal', 'evening']
  },
  {
    id: '2',
    name: 'Cashmere Cloud Sweater',
    price: 289,
    category: 'Sweaters',
    description: 'Indulge in the ultimate comfort with this premium cashmere sweater. Soft, warm, and effortlessly elegant.',
    imageUrls: [
      '/src/assets/sweater-main.jpg',
      '/src/assets/sweater-detail.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Camel', 'Sage Green'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['cashmere', 'comfort', 'luxury']
  },
  {
    id: '3',
    name: 'Diamond Essence Necklace',
    price: 1299,
    category: 'Jewelry',
    description: 'A stunning statement piece featuring lab-grown diamonds in an elegant setting. Timeless sophistication for special occasions.',
    imageUrls: [
      '/src/assets/necklace-main.jpg',
      '/src/assets/necklace-detail.jpg'
    ],
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewCount: 89,
    tags: ['jewelry', 'diamonds', 'luxury', 'special occasion']
  },
  {
    id: '4',
    name: 'Italian Leather Handbag',
    price: 699,
    originalPrice: 899,
    category: 'Bags',
    description: 'Handcrafted from the finest Italian leather, this versatile handbag combines functionality with timeless style.',
    imageUrls: [
      '/src/assets/handbag-main.jpg',
      '/src/assets/handbag-detail.jpg'
    ],
    colors: ['Black', 'Cognac', 'Navy'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 156,
    tags: ['leather', 'handbag', 'italian', 'versatile']
  },
  {
    id: '5',
    name: 'Signature Perfume',
    price: 159,
    category: 'Fragrance',
    description: 'An exclusive fragrance blend featuring notes of bergamot, white flowers, and warm amber. Your signature scent.',
    imageUrls: [
      '/src/assets/perfume-main.jpg'
    ],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 234,
    tags: ['fragrance', 'signature', 'luxury']
  },
  {
    id: '6',
    name: 'Merino Wool Dress',
    price: 349,
    category: 'Dresses',
    description: 'A sophisticated midi dress crafted from premium merino wool. Perfect for transitional seasons with its elegant drape.',
    imageUrls: [
      '/src/assets/dress-main.jpg',
      '/src/assets/dress-detail.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy', 'Navy', 'Forest Green'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 178,
    tags: ['merino wool', 'midi', 'sophisticated']
  },
  {
    id: '7',
    name: 'Silk Scarf Collection',
    price: 189,
    category: 'Accessories',
    description: 'A luxurious silk scarf featuring an exclusive print. Versatile styling options for any sophisticated look.',
    imageUrls: [
      '/src/assets/scarf-main.jpg'
    ],
    colors: ['Royal Blue', 'Emerald', 'Rose Gold'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 92,
    tags: ['silk', 'scarf', 'print', 'versatile']
  },
  {
    id: '8',
    name: 'Premium Sunglasses',
    price: 449,
    category: 'Accessories',
    description: 'Designer sunglasses with premium lenses and titanium frames. UV protection meets luxury craftsmanship.',
    imageUrls: [
      '/src/assets/sunglasses-main.jpg'
    ],
    colors: ['Black', 'Tortoiseshell', 'Gold'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 143,
    tags: ['sunglasses', 'designer', 'titanium', 'UV protection']
  },
  {
    id: '9',
    name: 'Tailored Wool Overcoat',
    price: 599,
    originalPrice: 749,
    category: 'Outerwear',
    description: 'A refined double-breasted overcoat crafted from premium Italian wool for impeccable drape and warmth.',
    imageUrls: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Camel'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 98,
    tags: ['coat', 'wool', 'tailored']
  },
  {
    id: '10',
    name: 'Minimal Leather Sneakers',
    price: 259,
    category: 'Footwear',
    description: 'Handmade full-grain leather sneakers with a minimalist silhouette and cushioned footbed.',
    imageUrls: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['White', 'Black'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 210,
    tags: ['sneakers', 'leather', 'minimal']
  },
  {
    id: '11',
    name: 'Satin Evening Dress',
    price: 429,
    category: 'Dresses',
    description: 'A lustrous satin midi dress with a flattering bias cut and adjustable straps.',
    imageUrls: [
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald', 'Black'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 167,
    tags: ['evening', 'satin', 'midi']
  },
  {
    id: '12',
    name: 'Chronograph Steel Watch',
    price: 899,
    category: 'Watches',
    description: 'Precision chronograph with sapphire crystal and brushed 316L steel bracelet.',
    imageUrls: [
      '/src/assets/watch-main.jpg'
    ],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 112,
    tags: ['watch', 'steel', 'chronograph']
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Manas Nayak',
  email: 'manvamp2003@gmail.com',
  avatar: '/src/assets/manas-photo.jpg'
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Midnight Blue'
      }
    ],
    total: 399,
    status: 'delivered',
    orderDate: '2024-08-15',
    estimatedDelivery: '2024-08-18'
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [
      {
        product: mockProducts[1],
        quantity: 2,
        selectedSize: 'S',
        selectedColor: 'Cream'
      }
    ],
    total: 578,
    status: 'shipped',
    orderDate: '2024-08-20',
    estimatedDelivery: '2024-08-25'
  }
];

export const categories = [
  'Blazers',
  'Sweaters',
  'Dresses',
  'Jewelry',
  'Bags',
  'Accessories',
  'Fragrance',
  'Outerwear',
  'Footwear',
  'Watches'
];

export const priceRange: [number, number] = [0, 1500];