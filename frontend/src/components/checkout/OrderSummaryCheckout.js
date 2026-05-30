import React from 'react';
import { Card, ListGroup, Button, Spinner } from 'react-bootstrap';
import styles from './OrderSummaryCheckout.module.css';

const OrderSummaryCheckout = ({ cart, onPlaceOrder, loading, disabled }) => {
  const totalPrice = cart?.total_price || 0;
  const shippingCost = 0;
  const finalPrice = totalPrice + shippingCost;

  return (
    <Card className={styles.summaryCard}>
      <Card.Header className={styles.header}>خلاصه سفارش</Card.Header>
      <ListGroup variant="flush">
        {cart?.cart_items?.map(item => (
          <ListGroup.Item key={item.id} className={styles.item}>
            <span>{item.product_name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className={styles.totalRow}>
          <span>جمع کل</span>
          <span>{finalPrice.toLocaleString()} تومان</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        <Button
          variant="success"
          size="lg"
          className="w-100"
          onClick={onPlaceOrder}
          disabled={disabled || loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'ثبت سفارش و پرداخت'}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default OrderSummaryCheckout;