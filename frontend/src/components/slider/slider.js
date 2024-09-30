import React from "react";
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import girlImg from "../../assets/images/home/girl2.jpg";
import "../../assets/css/slider.css";

const Slider = () => {
    return (
        <section id="slider">
            <div className="container">
                <Carousel>
                    <Carousel.Item className="item">
                        <div className="row">
                            <div className="col-sm-6">
                                <h1><span>SHOP</span>CENTER</h1>
                                <h2>Shop Center</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <Button variant="warning" className="get">Get it now</Button>
                            </div>
                            <div className="col-sm-6">
                                <img src={girlImg} className="girl img-fluid" alt="Girl" />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className="item">
                        <div className="row">
                            <div className="col-sm-6">
                                <h1><span>SHOP</span>CENTER</h1>
                                <h2>Shop Center</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <Button variant="warning" className="get">Get it now</Button>
                            </div>
                            <div className="col-sm-6">
                                <img src={girlImg} className="girl img-fluid" alt="Girl" />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </section>
    );
};

export default Slider;