import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import HomePage from './pages/homePage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ProductDetail from './pages/productDetail';
import './assets/css/responsive.css';
import './assets/css/main.css';
import './assets/js/main.js';

import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.min.js';

import './assets/css/price-range.css';
import './assets/css/font-awesome.min.css';
import './assets/css/animate.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes > 
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="products/:productId" element={<ProductDetail/>} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;