import React, { useEffect, useState } from 'react';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosConfig from '../axiosConfig';
import { fetchOrderDetail } from '../redux/order/orderThunks';
import styles from './PaymentPage.module.css';

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.order);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  // Redirect if order is not in pending status (already paid or cancelled)
  useEffect(() => {
    if (currentOrder && currentOrder.status !== 'Pending') {
      toast.warning('این سفارش قابل پرداخت نیست.');
      navigate('/dashboard/orders');
    }
  }, [currentOrder, navigate]);

  const handleZarinPalPayment = async () => {
    setPaying(true);
    try {
      const response = await axiosConfig.post(
        `http://localhost/api/v1/payments/zarinpal/request/`,
        { order_id: orderId }
      );
      window.location.href = response.data.payment_url;
    } catch (error) {
      toast.error(error.response?.data?.error || 'خطا در اتصال به درگاه پرداخت');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}><Spinner animation="border" /></div>;
  }

  if (error) {
    return (
      <Container className={styles.container}>
        <Alert variant="danger">{error.error || error.message || 'خطا در بارگذاری سفارش'}</Alert>
        <Button onClick={() => navigate('/dashboard/orders')}>بازگشت به سفارش‌ها</Button>
      </Container>
    );
  }

  if (!currentOrder) return null;

  return (
    <div className={styles.paymentPage}>
      <Container>
        <h2 className={styles.pageTitle}>پرداخت سفارش</h2>
        <div className={styles.orderInfo}>
          <p>کد سفارش: <strong>{currentOrder.code}</strong></p>
          <p>مبلغ قابل پرداخت: <strong>{currentOrder.total_price?.toLocaleString()} تومان</strong></p>
        </div>
        <div className={styles.paymentOptions}>
          <h5>انتخاب درگاه پرداخت</h5>
          <Button
            variant="warning"
            size="lg"
            onClick={handleZarinPalPayment}
            disabled={paying}
            className={styles.zarinpalBtn}
          >
            {paying ? <Spinner animation="border" size="sm" /> : 'پرداخت با زرین‌پال'}
          </Button>
          <p className={styles.testNote}>
            (درگاه آزمایشی زرین‌پال - برای تست از شماره کارت ۵۰۲۲۲۹۱۰۰۰۰۰۰۰۰۰ استفاده کنید)
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PaymentPage;