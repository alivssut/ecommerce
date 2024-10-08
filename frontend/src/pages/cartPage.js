import React, { useState, useEffect } from 'react';
import CartSummary from '../components/cart/cartSummary';
import '../assets/css/cart.css';
import { getCart } from '../redux/cart/cartThunks';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

const CartPage = () => {
  const dispatch = useDispatch();
  const { currentCart, loading, cartError } = useSelector((state) => state.cart);

  useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

  const [totalPrice, setTotalPrice] = useState(300000);
  const [discount, setDiscount] = useState(50000);
  const [shipping, setShipping] = useState(0);

  const handleRemove = (id) => {
    // const filteredItems = cartItems.filter(item => item.id !== id);
    // setCartItems(filteredItems);
  };

  return (
    <div className="cart-page container mt-5">
      <h3>سبد خرید شما</h3>
      {loading ? (
  <p>در حال بارگذاری...</p>
) : cartError ? (
  <Alert variant="danger">خطایی رخ داده است: {cartError}</Alert>
) : currentCart && currentCart.length > 0 ? (
  <CartSummary
    cartItems={currentCart}
    totalPrice={totalPrice}
    discount={discount}
    shipping={shipping}
    onRemove={handleRemove}
  />
) : (
  <Alert variant="warning">سبد خرید شما خالی است!</Alert>
)}
    </div>
  );
};

export default CartPage;
