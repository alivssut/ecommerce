import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import HomePage from './pages/homePage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ProductDetail from './pages/productDetail';
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductListPage from './pages/products';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes > 
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="products/:slug" element={<ProductDetail />} />
          {/* <Route exact path="products/:productId" element={<ProductDetail/>} /> */}
          <Route exact path="products/" element={<ProductListPage/>} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;