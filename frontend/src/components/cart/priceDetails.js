import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styles from './PriceDetails.module.css';

const PriceDetails = ({ totalPrice }) => {
  const shippingCost = 0;
  const discount = 0;

  const finalPrice = totalPrice - discount + shippingCost;

  return (
    <div className={styles.priceDetails}>
      <h5 className={styles.title}>خلاصه سفارش</h5>
      <ListGroup variant="flush">
        <ListGroup.Item className={styles.priceRow}>
          <span>جمع سبد خرید</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </ListGroup.Item>
        <ListGroup.Item className={styles.priceRow}>
          <span>تخفیف</span>
          <span className={styles.discount}>{discount.toLocaleString()} تومان</span>
        </ListGroup.Item>
        <ListGroup.Item className={styles.priceRow}>
          <span>هزینه ارسال</span>
          <span>{shippingCost === 0 ? 'رایگان' : `${shippingCost.toLocaleString()} تومان`}</span>
        </ListGroup.Item>
        <ListGroup.Item className={`${styles.priceRow} ${styles.finalRow}`}>
          <strong>مبلغ قابل پرداخت</strong>
          <strong className={styles.finalPrice}>{finalPrice.toLocaleString()} تومان</strong>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default PriceDetails;