import { Container, Row, Col} from 'react-bootstrap';
import "../assets/css/categoryProducts.css"
import shippingImg from "../assets/images/home/shipping.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../components/pagination/pagination';
import ProductCardComponent from '../components/cards/productCard';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../redux/product/productThunks';
import { useSelector, useDispatch } from 'react-redux';


function CategoryProductsPage() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { products, next, previous, count, loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductsByCategory(slug));
      }, [products]);

    const handlePageChange = (page) => {
        navigate("/category?page=" + page);
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

export default CategoryProductsPage;