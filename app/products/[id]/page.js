'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { products } from '../../lib/products';
import { formatBDTFromUSD } from '../../lib/currency';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Product not found</h1>
          <button
            onClick={() => router.back()}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedMessage(`Added ${quantity} item(s) to cart!`);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    handleAddToCart();
    setTimeout(() => router.push('/cart'), 500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/products" className="hover:text-black dark:hover:text-white">
            Products
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-gray-200 dark:bg-gray-800 h-96 rounded-lg mb-4 overflow-hidden">
                <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget;
                  try {
                    if (t.src !== product.image) t.src = product.image || '/placeholder.svg';
                    else t.src = '/placeholder.svg';
                  } catch (err) {
                    t.src = '';
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 rounded-lg cursor-pointer overflow-hidden border-2 transition ${
                    selectedImage === i
                      ? 'border-black dark:border-white'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget;
                      try {
                        if (t.src !== product.image) t.src = product.image || '/placeholder.svg';
                        else t.src = '/placeholder.svg';
                      } catch (err) {
                        t.src = '';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
              <div className="mb-6">
              <span className="text-4xl font-bold text-black dark:text-white">{formatBDTFromUSD(product.price)}</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-semibold">✓ In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mb-6 flex items-center gap-4">
                <label className="font-semibold text-black dark:text-white">Quantity:</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-gray-300 dark:border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {addedMessage && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg">
                {addedMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 border-2 border-black dark:border-white text-black dark:text-white py-3 rounded-lg font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticated ? 'Buy Now' : 'Login to Buy'}
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Features</h2>
            <ul className="space-y-3">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-lg text-green-600">✓</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Shipping & Returns</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-semibold text-black dark:text-white mb-2">Free Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400">On orders over $100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-semibold text-black dark:text-white mb-2">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-400">30-day return guarantee</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-semibold text-black dark:text-white mb-2">Warranty</h3>
                <p className="text-gray-600 dark:text-gray-400">2-year manufacturer warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
