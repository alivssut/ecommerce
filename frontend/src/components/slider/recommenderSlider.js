import React from 'react';
import { Carousel } from 'react-bootstrap';
import "../../assets/css/recommenderSlider.css";
import ProductCardComponent from '../cards/productCard';

const RecommenderSlider = ({ products, title }) => {
    // Group products into sets (e.g., 2 products per slide)
    const groupedProducts = [];
    const itemsPerSlide = 4; // Number of products per slide

    for (let i = 0; i < products.length; i += itemsPerSlide) {
        groupedProducts.push(products.slice(i, i + itemsPerSlide));
    }

    return (
        <div className="recommended_items">
            <div className="section-title-wrapper">
                <hr className="section-title-line" />
                <h2 className="title text-center">{title}</h2>
                <hr className="section-title-line" />
            </div>

            <Carousel indicators={false} interval={3000} controls={true} className="carousel-custom">
                {groupedProducts.map((group, index) => (
                    <Carousel.Item key={index}>
                        <div className="row">
                            {group.map((product) => (
                                <ProductCardComponent key={product.id} product={product} />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default RecommenderSlider;