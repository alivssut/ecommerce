import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import girlImg  from "../../assets/images/home/girl2.jpg"
import pricingImg  from "../../assets/images/home/pricing.png"

const Slider = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
    // axios.get("http://localhost:8000/api/v1/slider/posts/").then((response) => {
    //   if (response.status === 200) {
    //     setPosts(response.data)
    //   }
    // }).catch((error) => console.log(error));
    }, []);

    return (
        <section id="slider">
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<div id="slider-carousel" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
							<li data-target="#slider-carousel" data-slide-to="1"></li>
						</ol>
						
						<div className="carousel-inner">
							
							<div className="item active">
								<div className="col-sm-6">
									<h1><span>SHOP</span>CENTER</h1>
									<h2>Shop Center</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
									<button type="button" className="btn btn-default get">Get it now</button>
								</div>
								<div className="col-sm-6">
									<img src={girlImg} className="girl img-responsive" alt="" />
									<img src={pricingImg}  className="pricing" alt="" />
								</div>
							</div>
							
							<div className="item">
								<div className="col-sm-6">
									<h1><span>SHOP</span>CENTER</h1>
									<h2>Shop Center</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
									<button type="button" className="btn btn-default get">Get it now</button>
								</div>
								<div className="col-sm-6">
									<img src={girlImg} className="girl img-responsive" alt="" />
									<img src={pricingImg} className="pricing" alt="" />
								</div>
							</div>
							
						</div>
						
						<a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
							<i className="fa fa-angle-left"></i>
						</a>
						<a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
							<i className="fa fa-angle-right"></i>
						</a>
					</div>
					
				</div>
			</div>
		</div>
	</section>
	
    );
};

export default Slider;