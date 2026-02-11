'use client';

import Link from 'next/link';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { formatBDTFromUSD } from '../lib/currency';

const statusColors = {
  'Processing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusIcons = {
  'Processing': '⏳',
  'Shipped': '📦',
  'Delivered': '✓',
};

export default function Orders() {
  const { orders, isLoaded } = useOrder();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isLoaded) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">My Orders</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start shopping to place your first order
            </p>
            <Link href="/products">
              <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order ID</p>
                      <p className="text-lg font-semibold text-black dark:text-white">#{order.id.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Date</p>
                      <p className="text-lg font-semibold text-black dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                      <p className="text-lg font-semibold text-black dark:text-white">
                        {formatBDTFromUSD(order.total)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                        <span>{statusIcons[order.status]}</span>
                        {order.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Items Ordered</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
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
                          <h4 className="font-semibold text-black dark:text-white mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-black dark:text-white">
                            {formatBDTFromUSD(item.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatBDTFromUSD(item.price)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Delivery Status</h3>
                  <div className="space-y-4">
                    {/* Processing */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                          ⏳
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-black dark:text-white">Processing</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your order is being prepared</p>
                      </div>
                    </div>

                    {/* Shipped */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          ['Shipped', 'Delivered'].includes(order.status) ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                          📦
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-black dark:text-white">Shipped</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your order is on its way</p>
                      </div>
                    </div>

                    {/* Delivered */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          ✓
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-black dark:text-white">Delivered</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.status === 'Delivered' 
                            ? 'Your order has been delivered' 
                            : `Estimated: ${new Date(order.estimatedDelivery).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <Link href="/products">
            <button className="text-black dark:text-white font-medium hover:underline">
              ← Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
