import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import ProductCardComponent from '../cards/productCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ReactLoading type="spin" color="#f57c00" height={40} width={40} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>محصولی در این دسته‌بندی یافت نشد.</p>
      </div>
    );
  }

  return (
    <Row className={styles.productGrid}>
      {products.map((product) => (
        <Col xs={12} sm={6} md={4} lg={4} xl={3} key={product.id} className={styles.gridItem}>
          <ProductCardComponent product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;