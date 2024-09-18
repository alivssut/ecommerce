import { Container, Row, Col, Carousel, Tab, Nav, Form, Button, Modal} from 'react-bootstrap';
import "../assets/css/products.css"
import shippingImg from "../assets/images/home/shipping.jpg";
import productImg from "../assets/images/home/product.jpg";
import { FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../components/pagination/pagination';
import ProductCardComponent from '../components/cards/productCard';

function ProductListPage() {
    const [count, setCount] = useState(-1)
    const [products, setProducts] = useState([])
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost/api/v1/products?page=" + (params.get('page') == null ? 1 : params.get('page'))).then((response) => {
          if (response.status === 200) {
            setProducts(response.data.results)
            setCount(response.data.count)
          }
        }).catch((error) => console.log(error));
      }, [currentPage]);

    const handlePageChange = (page) => {
        navigate("/products?page=" + page);
        setCurrentPage(page);
    };

  return (
    <section style={{ direction: 'rtl', paddingTop: '20px' }}>
		<Container>
		  <Row>
			{/* Sidebar on the right */}
			<Col sm={3} className="padding-left">
				<div className='right-sidebar'>
				<ul className="catalog category-products">
				  <li className="category-products">
				  <div class="heading-with-lines">
					<h2>دسته‌بندی‌ها</h2>
					</div>
					<ul>
					  <li><a href="#">دسته‌بندی 1</a></li>
					  <li><a href="#">دسته‌بندی 2</a></li>
					  <li><a href="#">دسته‌بندی 3</a></li>
					  <li><a href="#">دسته‌بندی 4</a></li>
					</ul>
				  </li>
				</ul>
				</div>
			  <div className='right-sidebar'>
			  <div class="heading-with-lines">
				<h2>برندها</h2>
			  </div>

				<ul className="brands">
					<li><a href=""> <span class="pull-left">(50)</span>برنـد 1</a></li>
					<li><a href=""> <span class="pull-left">(56)</span>برنـد 2</a></li>
					<li><a href=""> <span class="pull-left">(27)</span>برنـد 3</a></li>
					<li><a href=""> <span class="pull-left">(32)</span>برنـد 4</a></li>
					<li><a href=""> <span class="pull-left">(5)</span>برنـد 5</a></li>
				</ul>
			  </div>
			  <div className="right-sidebar">
				<div className="shipping-info">
				  <img src={shippingImg} alt="Shipping Info" />
				</div>
			  </div>
			</Col>
  
			{/* Main product details */}
			<Col sm={9} className="padding-right">
                <div className="product-list">
                    <div className="heading-with-lines">
                        <h2>محصولات</h2>
                    </div>
                    <Row>
                        {products.map((product) => (
                            <ProductCardComponent key={product.id} product={product} />
                        ))}
                    </Row>
                </div>
			</Col>
		  </Row>
		</Container>
        <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} handlePageChange={handlePageChange} contentPerPage={5} />
	  </section>
  );
}

export default ProductListPage;
