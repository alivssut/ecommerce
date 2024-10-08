import React from 'react';
import { Tabs, Tab, Container, Row, Col, Button } from 'react-bootstrap';
import tabsImg from "../../assets/images/home/Tabs.png";
import "../../assets/css/categoryTab.css";
import ProductCardComponent from '../cards/productCard';

const CategoryTab = () => {
    const renderProducts = () => (
        <Row>
            {[...Array(4)].map((_, index) => (
                <ProductCardComponent key={index} product={{"name": "a", "price":12224, "image": tabsImg}} />
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
