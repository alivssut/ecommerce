import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Tab, Nav, Form, Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'react-router-dom';
import RecommenderSlider from '../components/slider/recommenderSlider';
import one from '../assets/images/product-details/1.jpg';
import similar from '../assets/images/product-details/similar1.jpg';
import newImg from '../assets/images/product-details/new.jpg';
import galleryImg from '../assets/images/home/Gallery.jpg';
import shippingImg from "../assets/images/home/shipping.jpg";
import "../assets/css/productDetail.css"
import axios from "axios";
import ReactLoading from 'react-loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewForm from '../components/review/reviewForm';
import ReviewList from '../components/review/reviewList';

function ProductDetail() {
	const { slug } = useParams();
	const [quantity, setQuantity] = useState(0);
	const [show, setShow] = useState(false);
	const [currentImage, setCurrentImage] = useState(one);
	const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
	const [reviews, setReviews] = useState([]);

	const handleQuantityChange = (event) => {
	  setQuantity(event.target.value);
	};

	const handleClose = () => setShow(false);
	const handleShow = (image) => {
	  setCurrentImage(image);
	  setShow(true);
	};

	const [recommendedProducts, setRecommendedProducts] = useState([]);

	// Fetch product details
	const fetchProductDetails = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`http://localhost/api/v1/products/${slug}/`);
			setProduct(response.data);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setError("Product not found");
			} else {
				setError("Error fetching product details");
				toast.error("Error fetching product details");
			}
			console.error("Error fetching product details:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
        fetchProductDetails();
        fetchReviews();
    }, [slug]);

    useEffect(() => {
        // Fetch recommended products
        const fetchRecommendedProducts = async () => {
            try {
                const response = await axios.get(`http://localhost/api/v1/products/${product.id}/recommended/`);
                setRecommendedProducts(response.data);
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            }
        };

        fetchRecommendedProducts();
    }, [product]);

	const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost/api/v1/products/${slug}/reviews/`);
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

	const handleReviewAdded = () => {
        fetchReviews();
    };

	const groupImages = (images) => {
        const grouped = [];
        for (let i = 0; i < images.length; i += 3) {
            grouped.push(images.slice(i, i + 3));
        }
        return grouped;
    };

	const formatPrice = (price) => {
		price = price.toLocaleString();
        return parseInt(price.replace(/[^0-9]/g, '')).toLocaleString();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#000" height={50} width={50} />
            </div>
        );
    }

    if (error) {
        if (error === "Product not found") {
            return <div>404 - No product found</div>;
        }
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!product) {
        return <div>404 - No product found</div>;
    }
	const imageGroups = groupImages(product.images || []);

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
			  <div className="product-details">
				<Row>
				<Col sm={5}>
					<div className="view-product">
						<img
							src={product.image}
							alt="Product"
							onClick={() => handleShow(product.image)}
							style={{ cursor: 'pointer' }}
						/>
						<Button variant="secondary" onClick={() => handleShow(product.image)}>
						بزرگنمایـی
						</Button>
					</div>
					{imageGroups.length > 0 && (
						<Carousel>
							{imageGroups.map((group, i) => (
								<Carousel.Item key={i}>
									{group.map((image, j) => (
									<img
										src={image.image}
										alt={`Similar Product ${i}-${j}`}
										key={j}
										onClick={() => handleShow(image.image)}
										style={{ cursor: 'pointer' }}
									/>
									))}
									</Carousel.Item>
								))}
							</Carousel>
						)}

					{/* Modal for image zoom */}
					<Modal show={show} onHide={handleClose}>
						<Modal.Body>
						<img
							src={currentImage}
							alt="Zoomed Product"
							style={{ width: '100%', height: 'auto' }}
						/>
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							بستن
						</Button>
						</Modal.Footer>
					</Modal>
				</Col>
				  <Col sm={7}>
					<div className="product-information">
						<img src={newImg} className="newarrival" alt="New Arrival" />
						<h2 className="product-title">{product.name}</h2>
						<p className="product-id">{product.sku}</p>
						<div className="price-and-quantity">
						<span>
						<span>{formatPrice(product.price)} نومان</span>
						</span>
						<span>
						{product.amount > 0 && (
							<>
								<label>تعداد :</label>
								<input 
									type="number" 
									value={quantity} 
									onChange={handleQuantityChange} 
									className="search_box" 
								/>
							
								<Button variant="default" className="btn-fefault cart">
									<i className="fa fa-shopping-cart"></i>
									افـزودن به سبـد خریـد
								</Button>
						</>
							)}
						</span>
						</div>
						<div className="product-status">
						{product.amount > 0 ? (
                            <>
                                <p><b>موجودی:</b> {product.amount} عدد</p>
                            </>
                        ) : (
                            <p>در انبار موجود نمی‌باشد</p>
                        )}
						<p><b>شرایـط :</b> جدیـد</p>
						<p><b>برنـد :</b> برنـد</p>
						</div>
					</div>
				</Col>

				</Row>
  
				<Tab.Container id="left-tabs-example" defaultActiveKey="reviews">
				  <Row>
					<Col sm={12}>
					  <Nav variant="tabs">
						<Nav.Item>
						  <Nav.Link eventKey="details">جزئیات</Nav.Link>
						</Nav.Item>
						<Nav.Item>
						  <Nav.Link eventKey="reviews">نظرات ({reviews.count})</Nav.Link>
						</Nav.Item>
					  </Nav>
					</Col>
					<Col sm={12}>
					  <Tab.Content>
						<Tab.Pane eventKey="details">
						 <p>{product.description}</p>
						</Tab.Pane>
						<Tab.Pane eventKey="reviews">
							<div className="comment-section">
								<ReviewForm onReviewAdded={handleReviewAdded} />
								<ReviewList reviews={reviews} />
							</div>
						</Tab.Pane>

					  </Tab.Content>
					</Col>
				  </Row>
				</Tab.Container>
			  </div>
  
			  {/* Recommended products */}
			  <div className="recommended-products">
				<RecommenderSlider products={recommendedProducts} title={"محصولات پیشنهادی"}/>
			  </div>
			</Col>
		  </Row>
		</Container>
	  </section>
	);
  }
  
  export default ProductDetail;