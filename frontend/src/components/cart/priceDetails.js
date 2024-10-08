import React from 'react';
import { Card } from 'react-bootstrap';

const PriceDetails = ({ totalPrice, discount, shipping }) => {
  const finalPrice = totalPrice - discount + shipping;
  return (
    <Card>
      <Card.Body>
        <h5>جزئیات قیمت</h5>
        <div>
          <span>جمع کل: </span>
          <span>{totalPrice} تومان</span>
        </div>
        <div>
          <span>تخفیف: </span>
          <span>{discount} تومان</span>
        </div>
        <div>
          <span>هزینه ارسال: </span>
          <span>{shipping === 0 ? 'رایگان' : `${shipping} تومان`}</span>
        </div>
        <hr />
        <div>
          <strong>قابل پرداخت: </strong>
          <strong>{finalPrice} تومان</strong>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PriceDetails;
