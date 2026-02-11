'use client';

import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start adding items to your wishlist!</p>
            <Link href="/products">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
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
  );
}
