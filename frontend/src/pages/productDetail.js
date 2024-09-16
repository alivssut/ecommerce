import React, { useState } from 'react';
import { Container, Row, Col, Carousel, Tab, Nav, Form, Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

import RecommenderSlider from '../components/slider/recommenderSlider';
import one from '../assets/images/product-details/1.jpg';
import similar from '../assets/images/product-details/similar1.jpg';
import newImg from '../assets/images/product-details/new.jpg';
import galleryImg from '../assets/images/home/Gallery.jpg';
import shippingImg from "../assets/images/home/shipping.jpg";
import "../assets/css/productDetail.css"

function ProductDetail() {
	const [quantity, setQuantity] = useState(0);
	const [show, setShow] = useState(false);
	const [currentImage, setCurrentImage] = useState(one);

	const handleQuantityChange = (event) => {
	  setQuantity(event.target.value);
	};

	const handleClose = () => setShow(false);
	const handleShow = (image) => {
	  setCurrentImage(image);
	  setShow(true);
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
			  <div className="product-details">
				<Row>
				<Col sm={5}>
					<div className="view-product">
						<img
							src={one}
							alt="Product"
							onClick={() => handleShow(one)}
							style={{ cursor: 'pointer' }}
						/>
						<Button variant="secondary" onClick={() => handleShow(one)}>
						بزرگنمایـی
						</Button>
					</div>
					<Carousel>
						{[...Array(3)].map((_, i) => (
						<Carousel.Item key={i}>
							{[...Array(3)].map((_, j) => (
							<img
								src={similar}
								alt={`Similar Product ${i}-${j}`}
								key={j}
								onClick={() => handleShow(similar)}
								style={{ cursor: 'pointer' }}
							/>
							))}
						</Carousel.Item>
						))}
					</Carousel>

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
						<h2 className="product-title">گوشی موبایل اپل مدل iPhone 13 A2634 دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت</h2>
						<p className="product-id">شناسـه : 0110110</p>
						<div className="price-and-quantity">
						<span>
							<span>قیمت : 2.350.000 ريال</span>
						</span>
						<span>
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
						</span>
						</div>
						<div className="product-status">
						<p><b>موجـودی :</b> در انبـار موجود می باشد</p>
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
						  <Nav.Link eventKey="companyprofile">درباره سازنده</Nav.Link>
						</Nav.Item>
						<Nav.Item>
						  <Nav.Link eventKey="tag">برچسب</Nav.Link>
						</Nav.Item>
						<Nav.Item>
						  <Nav.Link eventKey="reviews">نظرات (5)</Nav.Link>
						</Nav.Item>
					  </Nav>
					</Col>
					<Col sm={12}>
					  <Tab.Content>
						<Tab.Pane eventKey="details">
						  <Row>
							{[...Array(4)].map((_, index) => (
							  <Col sm={3} key={index}>
								<div className="product-image-wrapper">
								  <div className="single-products">
									<div className="productinfo text-center">
									  <img src={galleryImg} alt={`Gallery ${index}`} />
									  <h2>1.250.000 ريال</h2>
									  <p>توضیحات کوتاه محصول</p>
									  <Button variant="default" className="add-to-cart">
										<i className="fa fa-shopping-cart"></i>افزودن به سبـد خریـد
									  </Button>
									</div>
								  </div>
								</div>
							  </Col>
							))}
						  </Row>
						</Tab.Pane>
						<Tab.Pane eventKey="companyprofile">
						  <Row>
							{[...Array(4)].map((_, index) => (
							  <Col sm={3} key={index}>
								<div className="product-image-wrapper">
								  <div className="single-products">
									<div className="productinfo text-center">
									  <img src={galleryImg} alt={`Gallery ${index}`} />
									  <h2>1.250.000 ريال</h2>
									  <p>توضیحات کوتاه محصول</p>
									  <Button variant="default" className="add-to-cart">
										<i className="fa fa-shopping-cart"></i>افزودن به سبـد خریـد
									  </Button>
									</div>
								  </div>
								</div>
							  </Col>
							))}
						  </Row>
						</Tab.Pane>
						<Tab.Pane eventKey="tag">
						  <Row>
							{[...Array(4)].map((_, index) => (
							  <Col sm={3} key={index}>
								<div className="product-image-wrapper">
								  <div className="single-products">
									<div className="productinfo text-center">
									  <img src={galleryImg} alt={`Gallery ${index}`} />
									  <h2>1.250.000 ريال</h2>
									  <p>توضیحات کوتاه محصول</p>
									  <Button variant="default" className="add-to-cart">
										<i className="fa fa-shopping-cart"></i>افزودن به سبـد خریـد
									  </Button>
									</div>
								  </div>
								</div>
							  </Col>
							))}
						  </Row>
						</Tab.Pane>
						<Tab.Pane eventKey="reviews">
							<div className="comment-section">
								{/* Previous reviews */}
								<div className="previous-reviews">
								<div className="review-item">
									<p className="review-author">مشتری 1</p>
									<p className="review-time">12:41 ب.ظ - 29 تیر 1397</p>
									<p className="review-text">
									لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
									لورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و
									</p>
								</div>

								<div className="review-item">
									<p className="review-author">مشتری 1</p>
									<p className="review-time">12:41 ب.ظ - 29 تیر 1397</p>
									<p className="review-text">
									لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
									لورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و
									</p>
								</div>
								{/* Add more review items as needed */}
								</div>

								{/* New review form */}
								<div className="form-review">
								<Form>
									<Form.Group controlId="formBasicReview">
									<Form.Label>نظر شما</Form.Label>
									<Form.Control as="textarea" rows={5} placeholder="نظر خود را بنویسید" />
									</Form.Group>
									<div className="submit-button">
										<Button variant="primary" type="submit">
											ارسال نظر
										</Button>
									</div>
								</Form>
								</div>
							</div>
						</Tab.Pane>

					  </Tab.Content>
					</Col>
				  </Row>
				</Tab.Container>
			  </div>
  
			  {/* Recommended products */}
			  <div className="recommended-products">
				<RecommenderSlider/>
			  </div>
			</Col>
		  </Row>
		</Container>
	  </section>
	);
  }
  
  export default ProductDetail;