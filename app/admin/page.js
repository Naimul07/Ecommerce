'use client';

import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useRouter } from 'next/navigation';
import { formatBDTFromUSD } from '../lib/currency';
import { useProductStore } from '../store/productStore';

export default function AdminDashboard() {
  const { isAdmin, adminLogin } = useAdmin();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Use Zustand store
  const { products, addProduct, deleteProduct, getMetrics } = useProductStore();
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Electronics',
    image: '',
    inStock: true,
  });
  
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminLogin(password)) {
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid admin password');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.description) {
      addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        image: newProduct.image || 'https://via.placeholder.com/300x300?text=Product',
        rating: 4.5,
        reviews: 0,
        category: newProduct.category,
      });
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: 'Electronics',
        image: '',
        inStock: true,
      });
      setSuccessMessage('Product added successfully! ✓');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const metrics = getMetrics();
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h1>
              <p className="text-gray-600 dark:text-gray-400">Secure Admin Access</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {loginError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                🔐 Demo Password: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin</p>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              📊 {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📈' },
            { id: 'products', label: '📦 Products', icon: '🛍️' },
            { id: 'add-product', label: '➕ Add Product', icon: '✨' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Products', value: metrics.totalProducts, icon: '📦', color: 'from-blue-500 to-blue-600' },
                { label: 'Categories', value: metrics.categories, icon: '🏷️', color: 'from-green-500 to-green-600' },
                { label: 'In Stock', value: metrics.inStock, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
                { label: 'Out of Stock', value: metrics.outOfStock, icon: '⚠️', color: 'from-orange-500 to-orange-600' },
                { label: 'Avg Price', value: `৳${Math.round(metrics.avgPrice * 110)}`, icon: '💰', color: 'from-purple-500 to-purple-600' },
              ].map((metric, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${metric.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm opacity-90 font-medium mb-1">{metric.label}</div>
                      <div className="text-3xl font-bold">{metric.value}</div>
                    </div>
                    <div className="text-3xl opacity-50">{metric.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Status</h2>
                  <div className="text-3xl">📊</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Available Items</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.inStock}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Low/Out of Stock</span>
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">{metrics.outOfStock}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Catalog Value</h2>
                  <div className="text-3xl">💎</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Total Value</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatBDTFromUSD(products.reduce((sum, p) => sum + p.price, 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Average Price</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatBDTFromUSD(metrics.avgPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Inventory</h2>
                  <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-semibold">
                    {filteredProducts.length} items
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Category</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">Price</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">Stock</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">Rating</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="text-6xl mb-4">📭</div>
                          <p className="text-gray-600 dark:text-gray-400 text-lg">No products found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                              />
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">{product.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{product.description.substring(0, 40)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                            {formatBDTFromUSD(product.price)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                product.inStock
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              }`}
                            >
                              {product.inStock ? '✓ In' : '✕ Out'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {[...Array(Math.floor(product.rating || 4))].map((_, i) => (
                                <span key={i} className="text-yellow-400">⭐</span>
                              ))}
                              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">({product.rating})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {deleteConfirm === product.id ? (
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => {
                                    deleteProduct(product.id);
                                    setDeleteConfirm(null);
                                    setSuccessMessage('Product deleted successfully! ✓');
                                    setTimeout(() => setSuccessMessage(''), 3000);
                                  }}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition transform hover:scale-105"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-xs font-bold transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(product.id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition transform hover:scale-105"
                              >
                                🗑️ Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Product</h2>
                <p className="text-gray-600 dark:text-gray-400">Create and manage your product catalog</p>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl font-medium flex items-center gap-3">
                  <span className="text-xl">✓</span>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="e.g., Premium Wireless Headphones"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Enter a detailed description of your product..."
                    rows="4"
                  />
                </div>

                {/* Row: Price & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-400 font-semibold">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    >
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home</option>
                      <option>Sports</option>
                      <option>Books</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="https://example.com/image.jpg"
                  />
                  {newProduct.image && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-32 h-32 rounded-xl object-cover border-2 border-gray-300 dark:border-gray-700"
                        onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                      />
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProduct.inStock}
                      onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                      className="w-5 h-5 rounded-lg accent-indigo-600 cursor-pointer"
                    />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Product is in stock
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>➕</span>
                  Add Product to Catalog
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
