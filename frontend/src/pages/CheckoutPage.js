import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddressCard from '../components/address/AddressCard';
import OrderSummaryCheckout from '../components/checkout/OrderSummaryCheckout';
import { fetchAddresses } from '../redux/address/addressThunks';
import { getCart } from '../redux/cart/cartThunks';
import { createOrder } from '../redux/order/orderThunks';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, loading: addressesLoading } = useSelector((state) => state.address);
  const { currentCart, loading: cartLoading } = useSelector((state) => state.cart);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const defaultAddress = addresses.find(addr => addr.selected);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('لطفاً یک آدرس انتخاب کنید.');
      return;
    }
    setPlacingOrder(true);
    try {
      const order = await dispatch(createOrder(selectedAddressId));
      toast.success('سفارش شما با موفقیت ثبت شد.');
      navigate(`/payment/${order.id}`);
    } catch (error) {
      toast.error(error?.error || 'خطا در ثبت سفارش.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartLoading || addressesLoading) {
    return <div className={styles.loading}><Spinner animation="border" /></div>;
  }

  if (!currentCart || currentCart.cart_items?.length === 0) {
    return (
      <Container className={styles.container}>
        <Alert variant="warning">سبد خرید شما خالی است.</Alert>
      </Container>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <Container>
        <h2 className={styles.pageTitle}>تکمیل سفارش</h2>
        <Row>
          <Col lg={8}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h5>آدرس تحویل</h5>
                <Button variant="link" onClick={() => navigate('/dashboard/addresses')}>
                  مدیریت آدرس‌ها
                </Button>
              </div>
              {addresses.length === 0 ? (
                <Alert variant="warning">
                  لطفاً ابتدا یک آدرس ثبت کنید.
                  <Button variant="link" onClick={() => navigate('/dashboard/addresses')}>
                    افزودن آدرس
                  </Button>
                </Alert>
              ) : (
                addresses.map(addr => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    selected={selectedAddressId === addr.id}
                    onSelect={() => setSelectedAddressId(addr.id)}
                    onEdit={() => navigate('/dashboard/addresses')}
                    onDelete={() => {}}
                    showActions={false}
                  />
                ))
              )}
            </div>
          </Col>
          <Col lg={4}>
            <OrderSummaryCheckout
              cart={currentCart}
              onPlaceOrder={handlePlaceOrder}
              loading={placingOrder}
              disabled={!selectedAddressId || addresses.length === 0}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;