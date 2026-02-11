'use client';

import { createContext, useContext, useState } from 'react';
import { products as initialProducts } from '../lib/products';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminProducts, setAdminProducts] = useState(initialProducts);
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isAdmin');
      return stored === 'true';
    }
    return false;
  });
  const [adminPassword] = useState('admin123'); // Simple password

  const adminLogin = (password) => {
    if (password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...adminProducts.map(p => p.id), 0) + 1,
    };
    setAdminProducts([...adminProducts, newProduct]);
    return newProduct;
  };

  const deleteProduct = (id) => {
    setAdminProducts(adminProducts.filter(p => p.id !== id));
  };

  const updateProduct = (id, updatedData) => {
    setAdminProducts(
      adminProducts.map(p => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const getMetrics = () => {
    return {
      totalProducts: adminProducts.length,
      categories: [...new Set(adminProducts.map(p => p.category))].length,
      avgPrice: (adminProducts.reduce((sum, p) => sum + p.price, 0) / adminProducts.length).toFixed(2),
      inStock: adminProducts.filter(p => p.inStock).length,
      outOfStock: adminProducts.filter(p => !p.inStock).length,
    };
  };

  return (
    <AdminContext.Provider
      value={{
        adminProducts,
        isAdmin,
        adminLogin,
        adminLogout,
        addProduct,
        deleteProduct,
        updateProduct,
        getMetrics,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
