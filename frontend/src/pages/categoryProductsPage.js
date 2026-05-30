import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProductSidebar from '../components/ProductSidebar/ProductSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import PaginationComponent from '../components/pagination/pagination';
import { fetchProductsByCategory } from '../redux/product/productThunks';

import styles from './CategoryProductsPage.module.css';

const CategoryProductsPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, count, loading } = useSelector((state) => state.product);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProductsByCategory(slug, currentPage));
  }, [dispatch, slug, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.categoryPage}>
      <Container fluid="lg">
        <Row>
          <Col lg={3} className={styles.sidebarColumn}>
            <ProductSidebar />
          </Col>

          <Col lg={9} className={styles.mainColumn}>
            <div className={styles.contentWrapper}>
              <ProductGrid products={products} loading={loading} />
              {count > productsPerPage && (
                <div className={styles.paginationWrapper}>
                  <PaginationComponent
                    count={count}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    contentPerPage={productsPerPage}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CategoryProductsPage;