import React from 'react';
import { Tabs, Tab, Container, Row, Col, Button } from 'react-bootstrap';
import tabsImg from "../../assets/images/home/Tabs.png";
import "../../assets/css/categoryTab.css"; // فایل CSS سفارشی

const CategoryTab = () => {
    const renderProducts = () => (
        <Row>
            {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={3} key={index}>
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img src={tabsImg} alt={`Product ${index + 1}`} />
                                <h2>560.000 ريال</h2>
                                <p>توضیحات کوتاه محصول</p>
                                <Button variant="default" className="add-to-cart">
                                    <i className="fa fa-shopping-cart"></i> افزودن به سبـد خریـد
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );

    return (
        <div className="category-tab">
            <Container>
                <Tabs defaultActiveKey="Tab_001" id="category-tabs">
                    <Tab eventKey="Tab_001" title="گـروه محصولات 1">
                        {renderProducts()}
                    </Tab>
                    <Tab eventKey="Tab_002" title="گـروه محصولات 2">
                        {renderProducts()}
                    </Tab>
                    <Tab eventKey="Tab_003" title="گـروه محصولات 3">
                        {renderProducts()}
                    </Tab>
                    <Tab eventKey="Tab_004" title="گـروه محصولات 4">
                        {renderProducts()}
                    </Tab>
                    <Tab eventKey="Tab_005" title="گـروه محصولات 5">
                        {renderProducts()}
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default CategoryTab;
