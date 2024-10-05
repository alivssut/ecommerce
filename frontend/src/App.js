import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
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


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes > 
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="products/:slug" element={<ProductDetail />} />
          <Route exact path="products/" element={<ProductListPage/>} />
          <Route exact path="login/" element={<LoginPage/>} />
          <Route exact path="cart/" element={<CartPage/>} />
          <Route exact path="contact-us/" element={<ContactUsPage/>} />
          <Route exact path="about-us/" element={<AboutUsPage/>} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;