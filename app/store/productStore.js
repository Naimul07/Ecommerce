import { create } from 'zustand';
import { products as initialProducts } from '../lib/products';

export const useProductStore = create((set, get) => ({
  products: initialProducts,

  addProduct: (product) => {
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: Math.max(...state.products.map(p => p.id), 0) + 1,
        },
      ],
    }));
  },

  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },

  updateProduct: (productId, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    }));
  },

  getProduct: (productId) => {
    return get().products.find((p) => p.id === productId);
  },

  getAllProducts: () => get().products,

  getMetrics: () => {
    const products = get().products;
    return {
      totalProducts: products.length,
      categories: new Set(products.map((p) => p.category)).size,
      inStock: products.filter((p) => p.inStock).length,
      outOfStock: products.filter((p) => !p.inStock).length,
      avgPrice: products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
    };
  },
}));
