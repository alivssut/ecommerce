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

function Layout() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/panel');
  return (
    <div className="App">
      {!isAdminPanel && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="panel/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="category/:slug" element={<CategoryProductsPage />} />
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