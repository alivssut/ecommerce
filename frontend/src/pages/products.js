import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductSidebar from '../components/ProductSidebar/ProductSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import PaginationComponent from '../components/pagination/PaginationComponent';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandName, setBrandName] = useState('');

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const brandSlug = searchParams.get('brand');
  const productsPerPage = 12;

  // Fetch brand name if brandSlug exists
  useEffect(() => {
    const fetchBrandName = async () => {
      if (!brandSlug) {
        setBrandName('');
        return;
      }
      try {
        const response = await axios.get(`http://localhost/api/v1/brands/`);
        const brand = response.data.find(b => b.slug === brandSlug);
        setBrandName(brand?.name || '');
      } catch (err) {
        console.error('Error fetching brand name:', err);
      }
    };
    fetchBrandName();
  }, [brandSlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `http://localhost/api/v1/products?page=${currentPage}`;
        if (brandSlug) {
          url += `&brand=${brandSlug}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setProducts(response.data.results);
          setCount(response.data.count);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('خطا در بارگذاری محصولات. لطفاً دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, brandSlug]);

  const handlePageChange = (page) => {
    const params = { page: page.toString() };
    if (brandSlug) params.brand = brandSlug;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = () => {
    if (brandName) return `محصولات برند ${brandName}`;
    return 'همه محصولات';
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <ProductSidebar />
          </aside>

          <main className={styles.mainContent}>
            <div className={styles.contentWrapper}>
              <h2 className={styles.pageTitle}>{getPageTitle()}</h2>
              {error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <>
                  <ProductGrid products={products} loading={loading} />
                  {count > productsPerPage && !loading && (
                    <div className={styles.paginationWrapper}>
                      <PaginationComponent
                        count={count}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        contentPerPage={productsPerPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;