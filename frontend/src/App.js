import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/homePage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ProductDetail from './pages/productDetail';
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductListPage from './pages/products';
import LoginPage from './pages/login';
import CartPage from './pages/cartPage';
import ContactUsPage from './pages/contactUsPage';
import AboutUsPage from './pages/aboutUsPage';
import CategoryProductsPage from './pages/categoryProductsPage';
import AdminLayout from './pages/admin/adminLayout';
import Dashboard from './pages/admin/dashboard';
import Products from './pages/admin/product';
import ProfilePage from './pages/ProfilePage';
import AddressBookPage from './pages/AddressBookPage';
import OrdersPage from './pages/OrdersPage';
import UserDashboard from './pages/UserDashboard';
import AdminCategories from './pages/admin/categories';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import PaymentVerifyPage from './pages/PaymentVerifyPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SearchPage from './pages/SearchPage';
import { toast, ToastContainer } from 'react-toastify';

function Layout() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/panel');
  return (
    <div className="App">
      <ToastContainer position="top-right" rtl />
      {!isAdminPanel && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="panel/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route index element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="addresses" element={<AddressBookPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          {/* <Route path="wishlist" element={<WishlistPage />} /> */}
        </Route>
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="category/:slug" element={<CategoryProductsPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
        <Route path="/payment/verify" element={<PaymentVerifyPage />} />

        <Route path="/search" element={<SearchPage />} />
      </Routes>
      {!isAdminPanel && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;