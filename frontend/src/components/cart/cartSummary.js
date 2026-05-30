import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from './cartItem';
import PriceDetails from './PriceDetails';
import styles from './CartSummary.module.css';

const CartSummary = ({ cartItems, totalPrice, onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Row className={styles.cartSummary}>
      <Col lg={8}>
        <div className={styles.itemsSection}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      </Col>
      <Col lg={4}>
        <div className={styles.sidebar}>
          <PriceDetails totalPrice={totalPrice} />
          <Button
            variant="success"
            size="lg"
            className={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            ادامه فرایند خرید
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default CartSummary;