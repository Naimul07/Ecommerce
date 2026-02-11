'use client';

import Link from 'next/link';
import { useCart } from './context/CartContext';
import { useState, useMemo } from 'react';
import { formatBDTFromUSD } from './lib/currency';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { useProductStore } from './store/productStore';

const categories = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'];
const categoryIcons = ['💻', '👗', '🏠', '⚽', '📚'];

export default function Home() {
  const { addToCart } = useCart();
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  
  // Get products from Zustand store
  const { products } = useProductStore();
  
  // Get featured products (first 6 or less)
  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

  const stats = [
    { icon: '🛍️', label: 'Products', value: products.length.toLocaleString() },
    { icon: '😊', label: 'Customers', value: '100,000+' },
    { icon: '🌍', label: 'Countries', value: '50+' },
    { icon: '⭐', label: 'Rating', value: '4.9/5' },
  ];

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Verified Buyer',
      text: 'Exceptional quality and super fast delivery! Highly recommended.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Mohammad Khan',
      role: 'Regular Customer',
      text: 'Best shopping experience I\'ve had. Great customer service!',
      rating: 5,
      avatar: '👨‍💻',
    },
    {
      name: 'Fatima Hassan',
      role: 'Happy Customer',
      text: 'Love this store! Quality products at amazing prices.',
      rating: 5,
      avatar: '👩‍🎓',
    },
  ];

  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      desc: 'On orders over ৳3,000',
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      desc: '100% encrypted & safe',
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      desc: '30-day return policy',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      desc: 'Always here to help',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section - Modern & Elegant */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-gray-800 opacity-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-300 to-purple-300 dark:from-indigo-900 dark:to-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-900 dark:to-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.172 5.172a4 4 0 015.656 0L10 6.343l-1.172-1.171a4 4 0 00-5.656 5.656L10 17.657l6.828-6.829a4 4 0 00-5.656-5.656L10 6.343l1.172-1.171a4 4 0 015.656 0l7.071 7.071a4 4 0 11-5.656 5.656L10 17.657l-6.828 6.829a4 4 0 01-5.656-5.656l7.071-7.071z" clipRule="evenodd" />
              </svg>
              New Collections Available
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Style
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Shop from thousands of premium products curated for quality and value. Fast delivery, secure payment, and exceptional customer service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/products">
                <button className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:-translate-y-1 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 3H3z" />
                  </svg>
                  Start Shopping
                </button>
              </Link>
              <button className="hidden sm:flex items-center gap-2 border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="text-3xl mt-1">{feature.icon}</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{feature.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Explore our wide range of products</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/products?category=${cat}`}>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl mb-3">{categoryIcons[idx]}</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{cat}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Our best-selling items this month</p>
            </div>
            <Link href="/products">
              <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold hover:underline transition">
                View All →
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No products available yet</p>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onQuickView={setSelectedQuickView}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Loved by customers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-4 font-semibold">LIMITED TIME OFFER</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get 30% Off Your First Order</h2>
          <p className="text-xl text-white/90 mb-8">Use code: WELCOME30 at checkout</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                Shop Now
              </button>
            </Link>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Get exclusive deals and updates delivered to your inbox</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      {selectedQuickView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative animate-in">
            <button
              onClick={() => setSelectedQuickView(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={selectedQuickView.image}
              alt={selectedQuickView.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedQuickView.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedQuickView.description}</p>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-indigo-600">{formatBDTFromUSD(selectedQuickView.price)}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedQuickView);
                setSelectedQuickView(null);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
