'use client';

import { useState, useMemo, Suspense } from 'react';
import { formatBDTFromUSD } from '../lib/currency';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '../store/productStore';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('popular');
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Get products from Zustand store
  const { products } = useProductStore();

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const searchQuery = searchParams.get('search') || '';

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const price = parseFloat(p.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'popular':
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Our Products</h1>
          <p className="text-white/90">Discover our amazing collection of premium items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        {searchQuery && (
          <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-gray-700 dark:text-gray-300">
              Showing results for <span className="font-bold">&quot;{searchQuery}&quot;</span>
              <button
                onClick={() => window.location.href = '/products'}
                className="ml-3 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Clear search
              </button>
            </p>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ৳{priceRange[0].toLocaleString()} - ৳{priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange([0, 5000]);
                  setSortBy('popular');
                  window.location.href = '/products';
                }}
                className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {displayedProducts.length} products
              </p>

              <div className="flex items-center gap-4">
                <div className="flex gap-2 lg:hidden">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Filters
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {displayedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No products found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setSelectedQuickView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative">
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
                // Add to cart logic
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
