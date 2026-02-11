'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatBDTFromUSD } from '../lib/currency';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { addOrder } = useOrder();
  const router = useRouter();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (cart.length === 0) {
      return;
    }

    // Create order with cart items
    addOrder({
      items: cart,
      total: cartTotal + cartTotal * 0.1, // Including tax
    });

    // Simulate checkout process
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      router.push('/orders');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Shopping Cart</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {checkoutSuccess && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg">
            ✓ Order placed successfully! Redirecting...
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link href="/products">
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    )}
                  </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-lg font-semibold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer mb-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{formatBDTFromUSD(item.price)}</p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600 dark:text-gray-400">Qty:</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-l border-r border-gray-300 dark:border-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <div>
                        <p className="text-lg font-semibold text-black dark:text-white">
                          {formatBDTFromUSD(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity} × {formatBDTFromUSD(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 dark:hover:text-red-500 font-medium text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/products">
                  <button className="text-black dark:text-white font-medium hover:underline">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-fit sticky top-24">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Order Summary</h2>

                {/* Totals */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatBDTFromUSD(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>{formatBDTFromUSD(cartTotal * 0.1)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-black dark:text-white">Total</span>
                  <span className="text-3xl font-bold text-black dark:text-white">
                    {formatBDTFromUSD(cartTotal + cartTotal * 0.1)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutSuccess || cart.length === 0}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm"
                    />
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
