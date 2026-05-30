import React, { useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getCart, removeFromCart, updateCartItem } from '../redux/cart/cartThunks';
import CartSummary from '../components/cart/cartSummary';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { currentCart, loading, cartError } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId));
      toast.success('محصول از سبد خرید حذف شد.');
    } catch (error) {
      toast.error(error?.error || 'خطا در حذف محصول.');
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(updateCartItem(itemId, newQuantity));
      toast.success('سبد خرید به‌روز شد.');
    } catch (error) {
      toast.error(error?.error || 'خطا در به‌روزرسانی تعداد.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="primary" />
        <p>در حال بارگذاری سبد خرید...</p>
      </div>
    );
  }

  if (cartError) {
    return (
      <Container className={styles.container}>
        <Alert variant="danger">
          خطا در بارگذاری سبد خرید: {cartError.error || cartError.message}
        </Alert>
      </Container>
    );
  }

  const cartItems = currentCart?.cart_items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <div className={styles.cartPage}>
      <Container>
        <h2 className={styles.pageTitle}>سبد خرید شما</h2>
        {isEmpty ? (
          <Alert variant="info" className={styles.emptyAlert}>
            سبد خرید شما خالی است.
          </Alert>
        ) : (
          <CartSummary
            cartItems={cartItems}
            totalPrice={currentCart.total_price}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </Container>
    </div>
  );
};

export default CartPage;