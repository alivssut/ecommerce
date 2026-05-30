import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Alert, Spinner } from 'react-bootstrap';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import PaginationComponent from '../components/pagination/PaginationComponent';
import styles from './ProductListPage.module.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const productsPerPage = 12;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setCount(0);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost/api/v1/products/search/`, {
          params: {
            search: query,
            page: currentPage,
          },
        });
        if (response.status === 200) {
          setProducts(response.data.results);
          setCount(response.data.count);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('خطا در جستجوی محصولات. لطفاً دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ q: query, page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!query) {
    return (
      <Container className="mt-5">
        <Alert variant="info">لطفاً عبارت جستجو را وارد کنید.</Alert>
      </Container>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.pageTitle}>
            نتایج جستجو برای "{query}"
            {!loading && count > 0 && ` (${count} محصول)`}
          </h2>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <>
              <ProductGrid products={products} loading={loading} />
              {!loading && products.length === 0 && (
                <Alert variant="warning">محصولی با این عبارت یافت نشد.</Alert>
              )}
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
      </div>
    </section>
  );
};

export default SearchPage;