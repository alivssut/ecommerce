import React from 'react';
import logo from "../../assets/images/home/logo.png"

export default function Header() {
  return (
    <div>
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><a href="#"><i className="fa fa-phone"></i> 80 21 24 36 98+ </a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className ="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className ="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className ="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className ="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className ="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4" style={{ textAlign: 'left' }}>
                            <div className="logo">
                                <a href="index.html"><img src={logo} alt="Logo" style={{ textAlign: "center"}} /></a>
                            </div>
                        </div>
                        
                        <div className="col-sm-8 header-middle-menu">
                            <div className="shop-menu pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-user"></i> حساب کاربـری</a></li>
                                    <li><a href="#"><i className="fa fa-star"></i> لیست علاقه مندی ها</a></li>
                                    <li><a href="login.html"><i className="fa fa-lock"></i> ورود</a></li>
                                    <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> سبد خریـد</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-sm-3">
                            <div className="search_box pull-left">
                                <input type="text" placeholder="جستـجو"/>
                            </div>
                        </div>
                        
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-right">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><a href="index.html" className="active">خـانه</a></li>
                                    <li className="dropdown"><a href="#">فروشگـاه<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="shop.html">محصولات</a></li>
                                            <li><a href="product-details.html">جزئیات محصولات</a></li> 
                                            <li><a href="checkout.html">پرداخت</a></li> 
                                            <li><a href="cart.html">سبـد خریـد</a></li> 
                                            <li><a href="login.html">ورود</a></li> 
                                        </ul>
                                    </li> 
                                    <li className="dropdown"><a href="#">اخبـار<i className="fa fa-angle-down"></i></a>
                                        <ul role="menu" className="sub-menu">
                                            <li><a href="blog.html">آخریـن اخبـار</a></li>
                                            <li><a href="blog-single.html">صفحـه خبـر</a></li>
                                        </ul>
                                    </li> 
                                    <li><a href="About.html">درباره مـا</a></li>
                                    <li><a href="contact-us.html">تماس با مـا</a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </header>
    </div>
  );
}