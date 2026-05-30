import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { verifyToken } from '../redux/auth/authThunks';
import { resetCartSuccess } from '../redux/cart/cartActions';

import ProductSidebar from '../components/ProductSidebar/ProductSidebar';
import ProductImageGallery from '../components/ProductImageGallery/ProductImageGallery';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import ProductTabs from '../components/ProductTabs/ProductTabs';
import RecommendedProducts from '../components/RecommendedProducts/RecommendedProducts';

import styles from '../assets/css/ProductDetail.module.css';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const { cartSuccess, cartError } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    if (cartError) toast.error(cartError.error);
  }, [cartError]);

  useEffect(() => {
    if (cartSuccess) {
      toast.success('محصول با موفقیت به سبد خرید اضافه شد!');
      dispatch(resetCartSuccess());
    }
  }, [cartSuccess, dispatch]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost/api/v1/products/${slug}/`);
      setProduct(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Product not found');
      } else {
        setError('Error fetching product details');
        toast.error('Error fetching product details');
      }
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost/api/v1/products/${slug}/reviews/`);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const fetchRecommendedProducts = async () => {
    if (!product?.id) return;
    try {
      const response = await axios.get(`http://localhost/api/v1/products/${product.id}/recommended/`);
      setRecommendedProducts(response.data);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [slug]);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [product]);

  const handleReviewAdded = () => fetchReviews();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ReactLoading type="spin" color="#f57c00" height={50} width={50} />
      </div>
    );
  }

  if (error) {
    return error === 'Product not found' ? (
      <div className={styles.error}>404 - محصول مورد نظر یافت نشد</div>
    ) : (
      <div className={styles.error}>
        <h2>خطا</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) return <div className={styles.error}>404 - محصول مورد نظر یافت نشد</div>;

  return (
    <section className={styles.productDetail} style={{ direction: 'rtl' }}>
      <ToastContainer />
      <Container fluid="lg">
        <Row>
          <Col lg={3} className={styles.sidebarColumn}>
            <ProductSidebar />
          </Col>
          <Col lg={9} className={styles.mainColumn}>
            <div className={styles.productWrapper}>
              <Row>
                <Col md={5}>
                  <ProductImageGallery images={product.images || []} mainImage={product.image} />
                </Col>
                <Col md={7}>
                  <ProductInfo product={product} />
                </Col>
              </Row>

              <ProductTabs
                product={product}
                reviews={reviews}
                token={token}
                onReviewAdded={handleReviewAdded}
              />

              <RecommendedProducts products={recommendedProducts} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetail;