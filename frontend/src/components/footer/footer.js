import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowCircleLeft } from 'react-icons/fa';
import mapImg from '../../assets/images/home/map.png';
import "../../assets/css/footer.css"

export default function Footer() {
    return (
      <footer id="footer">
        <div className="footer-Before py-4 bg-dark text-white">
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h3 className="mb-0">با عضویت در خبرنامه ما از تخفیفات ویژه ما با خبر شوید ...</h3>
              </Col>
              <Col md={4}>
                <div className="searchform newslatter d-flex">
                  <input type="text" placeholder="آدرس ایمیل شما ..." className="form-control me-2" />
                  <Button variant="warning" type="submit">
                    <FaArrowCircleLeft size={24} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
  
        <div className="footer-top py-4">
          <Container>
            <Row>
              <Col sm={3}>
                <div className="address">
                  <img src={mapImg} alt="Map" className="img-fluid" />
                </div>
              </Col>
              <Col sm={3}>
                <div className="address">
                  <img src={mapImg} alt="Map" className="img-fluid" />
                </div>
              </Col>
              <Col sm={6}>
                <div className="companyinfo">
                  <h2><span>SHOP</span>CENTER</h2>
                  <h4>درباره ما :</h4>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتاب‌های زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می‌طلبد تا با نرم‌افزارها شناخت بیشتری را برای طراحان رایانه‌ای علی‌الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
  
        <div className="footer-widget py-4 bg-light">
          <Container>
            <Row>
              <Col sm={3}>
                <div className="single-widget">
                  <h2>خدمات</h2>
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="#">کمک آنلاین</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">تماس با ما</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">وضعیت سفارش</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">تغییر مکان</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">پرسش‌های متداول</a>
                    </li>
                </ul>

                </div>
              </Col>
              <Col sm={3}>
                <div className="single-widget">
                  <h2>فروشگاه سریع</h2>
                  <ul className="nav nav-pills flex-column">
                    <li><a className="nav-link" href="#">تی‌شرت</a></li>
                    <li><a className="nav-link" href="#">مردانه</a></li>
                    <li><a className="nav-link" href="#">زنانه</a></li>
                    <li><a className="nav-link" href="#">کارت هدیه</a></li>
                    <li><a className="nav-link" href="#">کفش‌ها</a></li>
                  </ul>
                </div>
              </Col>
              <Col sm={3}>
                <div className="single-widget">
                  <h2>سیاست‌ها</h2>
                  <ul className="nav nav-pills flex-column">
                    <li><a className="nav-link" href="#">شرایط استفاده</a></li>
                    <li><a className="nav-link" href="#">سیاست حریم خصوصی</a></li>
                    <li><a className="nav-link" href="#">سیاست بازگشت</a></li>
                    <li><a className="nav-link" href="#">سیستم فاکتور</a></li>
                    <li><a className="nav-link" href="#">سیستم بلیط</a></li>
                  </ul>
                </div>
              </Col>
              <Col sm={3}>
                <div className="single-widget">
                  <h2>درباره ما</h2>
                  <ul className="nav nav-pills flex-column">
                    <li><a className="nav-link" href="#">اطلاعات شرکت</a></li>
                    <li><a className="nav-link" href="#">فرصت‌های شغلی</a></li>
                    <li><a className="nav-link" href="#">موقعیت فروشگاه</a></li>
                    <li><a className="nav-link" href="#">برنامه وابسته</a></li>
                    <li><a className="nav-link" href="#">حقوق کپی‌رایت</a></li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
  
        <div className="footer-bottom py-3 bg-dark text-white" style={{ direction: "ltr" }}>
          <Container>
            <Row>
              <Col className="text-center">
                <p className="mb-0">
                  Copyright © 2018 
                  <a target="_blank" rel="noopener noreferrer" href="http://www.1614GP.ir" className="text-warning ms-1"><b>1614Group</b></a>. All rights reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }