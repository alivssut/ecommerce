import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import galleryImg from "../../assets/images/home/product.jpg";
import { FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa'; // اضافه کردن آیکون‌ها
import "../../assets/css/recommenderSlider.css";  // فایل CSS سفارشی

const RecommenderSlider = () => {
    const products = [
        { id: 1, price: "1.250.000 تومان", description: "توضیحات کوتاه محصول", img: galleryImg },
        { id: 2, price: "1.250.000 تومان", description: "توضیحات کوتاه محصول", img: galleryImg },
        { id: 3, price: "1.250.000 تومان", description: "توضیحات کوتاه محصول", img: galleryImg },
        { id: 4, price: "1.250.000 تومان", description: "توضیحات کوتاه محصول", img: galleryImg }
    ];

    return (
        <div className="recommended_items">
            <div className="section-title-wrapper">
                <hr className="section-title-line" />
                <h2 className="title text-center">پر فروش ترین محصولات</h2>
                <hr className="section-title-line" />
            </div>

            <Carousel indicators={false} interval={3000} controls={true} className="carousel-custom">
                {products.map((product, index) => (
                    <Carousel.Item key={product.id}>
                        <div className="row">
                            {products.map((item, idx) => (
                                <div className="col-sm-3" key={idx}>
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src={item.img} alt={`Product ${item.id}`} />
                                                <h2 className="product-price">{item.price}</h2>
                                                <p className="product-description">{item.description}</p>
                                                
                                                {/* دکمه افزودن به سبد خرید */}
                                                <Button variant="default" className="add-to-cart">
                                                    <FaShoppingCart /> افزودن به سبـد خرید
                                                </Button>

                                                {/* دکمه‌های اضافی */}
                                                <div className="additional-buttons">
                                                    <Button variant="default" className="view-details">
                                                        <FaEye /> مشاهده جزییات
                                                    </Button>
                                                    <Button variant="default" className="add-to-wishlist">
                                                        <FaHeart /> افزودن به علاقه‌مندی‌ها
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default RecommenderSlider;
