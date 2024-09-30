import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../assets/css/productCard.css";

const LimitedText = ({ text, limit }) => {
    const truncatedText = text.length > limit ? text.slice(0, limit) + '...' : text;
    return <p>{truncatedText}</p>;
};

const ProductCardComponent = ({ product }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleViewDetails = () => {
        navigate(`/products/${product.slug}`); // Navigate to product detail page
    };

    const formatPrice = (price) => {
		price = price.toLocaleString();
        return parseInt(price.replace(/[^0-9]/g, '')).toLocaleString();
    };

    return (
        <div className="col-sm-3">
            <div className="product-image-wrapper">
                <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={product.image} alt={`Product ${product.id}`} />
                        <h2 className="product-price">{formatPrice(product.price)} تومان</h2>
                        
                        <LimitedText text={product.name} limit={20} />

                        <div className="additional-buttons">
                            <Button variant="default" className="view-details" onClick={handleViewDetails}>
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
    );
};

export default ProductCardComponent;
