import React from 'react';
import galleryImg from "../../assets/images/home/Gallery.jpg"

const RecommenderSlider = () => {

    return (
        <div className="recommended_items">
            <h2 className="title text-center">پر فروش ترین محصولات</h2>
            
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="item active">	
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">	
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src={galleryImg} alt="" />
                                        <h2>1.250.000 R</h2>
                                        <p>توضیحات کوتاه محصول</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>افزودن به سبـد خرید</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                    <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                    <i className="fa fa-angle-right"></i>
                    </a>			
            </div>
        </div>
				
    );
};

export default RecommenderSlider;