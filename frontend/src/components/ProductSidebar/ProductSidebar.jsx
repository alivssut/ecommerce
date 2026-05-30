import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shippingImg from '../../assets/images/home/shipping.jpg';
import styles from './ProductSidebar.module.css';

const ProductSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get('/api/v1/category-list/'),
          axios.get('/api/v1/brands/'),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSidebarData();
  }, []);

  return (
    <>
      <div className={styles.sidebarBlock}>
        <div className={styles.heading}>دسته‌بندی‌ها</div>
        <ul className={styles.linkList}>
          {loading ? (
            <li>در حال بارگذاری...</li>
          ) : (
            categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.sidebarBlock}>
        <div className={styles.heading}>برندها</div>
        <ul className={styles.linkList}>
          {loading ? (
            <li>در حال بارگذاری...</li>
          ) : (
            brands.map((brand) => (
              <li key={brand.id}>
                <Link to={`/products?brand=${brand.slug}`}>
                  {brand.name}
                  <span className={styles.count}>({brand.product_count})</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.shippingBanner}>
        <img src={shippingImg} alt="اطلاعات حمل و نقل" />
      </div>
    </>
  );
};

export default ProductSidebar;