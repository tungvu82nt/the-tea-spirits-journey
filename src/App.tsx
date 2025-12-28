import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import TeaSelection from "./pages/TeaSelection";
import LiquorCollection from "./pages/LiquorCollection";
import GiftCenter from "./pages/GiftCenter";
import CultureTraceability from "./pages/CultureTraceability";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyPhone from "./pages/VerifyPhone";
import Cart from "./pages/Cart";
import TeaProductDetail from "./pages/TeaProductDetail";
import LiquorProductDetail from "./pages/LiquorProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
import Collection from "./pages/Collection";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import Coupons from "./pages/Coupons";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ReturnPolicy from "./pages/ReturnPolicy";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import Products from "./pages/admin/products/Products";
import ProductForm from "./pages/admin/products/ProductForm";
import Categories from "./pages/admin/products/Categories";
import Inventory from "./pages/admin/products/Inventory";
import { Orders as AdminOrders } from "./pages/admin/orders/Orders";
import { OrderDetail as AdminOrderDetail } from "./pages/admin/orders/OrderDetail";
import { Customers as AdminCustomers } from "./pages/admin/customers/Customers";
import { CustomerDetail as AdminCustomerDetail } from "./pages/admin/customers/CustomerDetail";
import { Analytics } from "./pages/admin/analytics/Analytics";
import { Settings as AdminSettings } from "./pages/admin/settings/Settings";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const LazyTeaProductDetail = lazy(() => import('./pages/TeaProductDetail'));
const LazyLiquorProductDetail = lazy(() => import('./pages/LiquorProductDetail'));
const LazyCheckout = lazy(() => import('./pages/Checkout'));
const LazyOrders = lazy(() => import('./pages/Orders'));
const LazyOrderDetail = lazy(() => import('./pages/OrderDetail'));
const LazyWishlist = lazy(() => import('./pages/Wishlist'));
const LazyCollection = lazy(() => import('./pages/Collection'));
const LazyAddresses = lazy(() => import('./pages/Addresses'));
const LazyPaymentMethods = lazy(() => import('./pages/PaymentMethods'));
const LazyCoupons = lazy(() => import('./pages/Coupons'));
const LazySettings = lazy(() => import('./pages/Settings'));
const LazyContact = lazy(() => import('./pages/Contact'));
const LazyPrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const LazyTermsOfService = lazy(() => import('./pages/TermsOfService'));
const LazyReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));

const LazyAdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const LazyAdminProducts = lazy(() => import('./pages/admin/products/Products'));
const LazyAdminProductForm = lazy(() => import('./pages/admin/products/ProductForm'));
const LazyAdminCategories = lazy(() => import('./pages/admin/products/Categories'));
const LazyAdminInventory = lazy(() => import('./pages/admin/products/Inventory'));
const LazyAdminOrders = lazy(() => import('./pages/admin/orders/Orders'));
const LazyAdminOrderDetail = lazy(() => import('./pages/admin/orders/OrderDetail'));
const LazyAdminCustomers = lazy(() => import('./pages/admin/customers/Customers'));
const LazyAdminCustomerDetail = lazy(() => import('./pages/admin/customers/CustomerDetail'));
const LazyAdminAnalytics = lazy(() => import('./pages/admin/analytics/Analytics'));
const LazyAdminSettings = lazy(() => import('./pages/admin/settings/Settings'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tea" element={<TeaSelection />} />
              <Route path="/liquor" element={<LiquorCollection />} />
              <Route path="/gifts" element={<GiftCenter />} />
              <Route path="/culture" element={<CultureTraceability />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-phone" element={<VerifyPhone />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/tea/:id" element={<Suspense fallback={<LoadingFallback />}><LazyTeaProductDetail /></Suspense>} />
              <Route path="/liquor/:id" element={<Suspense fallback={<LoadingFallback />}><LazyLiquorProductDetail /></Suspense>} />
              <Route path="/checkout" element={<Suspense fallback={<LoadingFallback />}><LazyCheckout /></Suspense>} />
              <Route path="/account/orders" element={<Suspense fallback={<LoadingFallback />}><LazyOrders /></Suspense>} />
              <Route path="/account/orders/:orderId" element={<Suspense fallback={<LoadingFallback />}><LazyOrderDetail /></Suspense>} />
              <Route path="/account/wishlist" element={<Suspense fallback={<LoadingFallback />}><LazyWishlist /></Suspense>} />
              <Route path="/account/collections" element={<Suspense fallback={<LoadingFallback />}><LazyCollection /></Suspense>} />
              <Route path="/account/addresses" element={<Suspense fallback={<LoadingFallback />}><LazyAddresses /></Suspense>} />
              <Route path="/account/payment-methods" element={<Suspense fallback={<LoadingFallback />}><LazyPaymentMethods /></Suspense>} />
              <Route path="/account/coupons" element={<Suspense fallback={<LoadingFallback />}><LazyCoupons /></Suspense>} />
              <Route path="/account/settings" element={<Suspense fallback={<LoadingFallback />}><LazySettings /></Suspense>} />
              <Route path="/contact" element={<Suspense fallback={<LoadingFallback />}><LazyContact /></Suspense>} />
              <Route path="/privacy" element={<Suspense fallback={<LoadingFallback />}><LazyPrivacyPolicy /></Suspense>} />
              <Route path="/terms" element={<Suspense fallback={<LoadingFallback />}><LazyTermsOfService /></Suspense>} />
              <Route path="/return-policy" element={<Suspense fallback={<LoadingFallback />}><LazyReturnPolicy /></Suspense>} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Suspense fallback={<LoadingFallback />}><LazyAdminDashboard /></Suspense>} />
                <Route path="products" element={<Suspense fallback={<LoadingFallback />}><LazyAdminProducts /></Suspense>} />
                <Route path="products/new" element={<Suspense fallback={<LoadingFallback />}><LazyAdminProductForm /></Suspense>} />
                <Route path="products/:id/edit" element={<Suspense fallback={<LoadingFallback />}><LazyAdminProductForm /></Suspense>} />
                <Route path="categories" element={<Suspense fallback={<LoadingFallback />}><LazyAdminCategories /></Suspense>} />
                <Route path="inventory" element={<Suspense fallback={<LoadingFallback />}><LazyAdminInventory /></Suspense>} />
                <Route path="orders" element={<Suspense fallback={<LoadingFallback />}><LazyAdminOrders /></Suspense>} />
                <Route path="orders/:id" element={<Suspense fallback={<LoadingFallback />}><LazyAdminOrderDetail /></Suspense>} />
                <Route path="customers" element={<Suspense fallback={<LoadingFallback />}><LazyAdminCustomers /></Suspense>} />
                <Route path="customers/:id" element={<Suspense fallback={<LoadingFallback />}><LazyAdminCustomerDetail /></Suspense>} />
                <Route path="analytics" element={<Suspense fallback={<LoadingFallback />}><LazyAdminAnalytics /></Suspense>} />
                <Route path="settings" element={<Suspense fallback={<LoadingFallback />}><LazyAdminSettings /></Suspense>} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
