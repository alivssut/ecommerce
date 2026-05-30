import React from 'react';
import RecommenderSlider from '../slider/recommenderSlider';
import styles from './RecommendedProducts.module.css';

const RecommendedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className={styles.recommendedSection}>
      <h3 className={styles.sectionTitle}>محصولات پیشنهادی</h3>
      <RecommenderSlider products={products} />
    </div>
  );
};

export default RecommendedProducts;