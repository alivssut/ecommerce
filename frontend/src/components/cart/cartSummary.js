import React from 'react';
import CartItem from './cartItem';
import PriceDetails from './priceDetails';
import { Row, Col, Button, Alert } from 'react-bootstrap';

const CartSummary = ({ cartItems, totalPrice, discount, shipping, onRemove, onUpdateQuantity }) => {
  return (
    <>
      {cartItems && cartItems.length === 0 ? (
        <Alert variant="warning">سبد خرید شما خالی است!</Alert>
      ) : (
        <>
          <Row>
            <Col md={8}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}  // Pass update function
                />
              ))}
            </Col>
            <Col md={4}>
              <PriceDetails
                totalPrice={totalPrice}
                discount={discount}
                shipping={shipping}
              />
              <Button variant="success" block className="mt-3">
                ادامه فرایند خرید
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CartSummary;
