import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./components/Toast";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Store - Modern Ecommerce Shop",
  description: "Shop premium products with excellent customer experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>
            <AdminProvider>
              <CartProvider>
                <WishlistProvider>
                  <OrderProvider>
                    <Navigation />
                    {children}
                  </OrderProvider>
                </WishlistProvider>
              </CartProvider>
            </AdminProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
