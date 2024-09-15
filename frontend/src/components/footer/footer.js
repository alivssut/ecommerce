import React from 'react';

export default function Footer() {
  return (
    <div>
        <footer id="footer">
            <div className="footer-Before">
                <div className="container">
                    <div className="block-news">
                        <div className="row">
                            <h3>با عضویت در خبـرنامه ما از تخفیفات ویـژه ما با خبـر شوید ... </h3>
                            <div className="searchform newslatter">
                                <input type="text" placeholder="آدرس ایمیـل شما ..."/>
                                <button type="submit" className="btn btn-default">
                                    <i className="fa fa-arrow-circle-o-left"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="address">
                                <img src="images/home/map.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="address">
                                <img src="images/home/map.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="companyinfo">
                                <h2><span>SHOP</span>CENTER</h2>
                                <h4>درباره ما :</h4>
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده ازلورملورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-widget">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="single-widget">
                                <h2>Service</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li><a href="#">Online Help</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Order Status</a></li>
                                    <li><a href="#">Change Location</a></li>
                                    <li><a href="#">FAQ’s</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-widget">
                                <h2>Quock Shop</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li><a href="#">T-Shirt</a></li>
                                    <li><a href="#">Mens</a></li>
                                    <li><a href="#">Womens</a></li>
                                    <li><a href="#">Gift Cards</a></li>
                                    <li><a href="#">Shoes</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-widget">
                                <h2>Policies</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li><a href="#">Terms of Use</a></li>
                                    <li><a href="#">Privecy Policy</a></li>
                                    <li><a href="#">Refund Policy</a></li>
                                    <li><a href="#">Billing System</a></li>
                                    <li><a href="#">Ticket System</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-widget">
                                <h2>About Shopper</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li><a href="#">Company Information</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">Store Location</a></li>
                                    <li><a href="#">Affillate Program</a></li>
                                    <li><a href="#">Copyright</a></li>
                                </ul>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom" style={{ direction: "ltr !important"}}>
                <div className="container">
                    <div className="row">
                        <p className="pull-left">Copyright © 2018 
                            <a target="_blank" href="http://www.1614GP.ir"><b>1614Group</b></a>. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            
        </footer>
    </div>
  );
}