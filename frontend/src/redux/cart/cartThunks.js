import axiosConfig from '../../axiosConfig';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  clearCart,
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  getCartListRequest,
  getCartListSuccess,
  getCartListFailure,
} from './cartActions';

// Add to Cart Thunk
export const addToCart = (product_id, variant_id, quantity = 1) => async (dispatch) => {
  dispatch(addToCartRequest());
  try {
    const response = await axiosConfig.post('http://localhost/api/v1/cart/add/', {
      "product_id": product_id,
      "variant_id": variant_id,
      "quantity": quantity,
    });
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartFailure(error.response?.data || 'خطا در افزودن به سبد خرید'));
  }
};

// Remove from Cart Thunk
export const removeFromCart = (itemId) => async (dispatch) => {
  dispatch(removeFromCartRequest());
  try {
    const response = await axiosConfig.delete(`/v1/cart/remove/${itemId}/`);
    dispatch(removeFromCartSuccess(response.data));
  } catch (error) {
    dispatch(removeFromCartFailure(error.response?.data || 'خطا در حذف محصول'));
  }
};

// Update Cart Item Thunk
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await axiosConfig.patch(`/v1/cart/update/${itemId}/`, {
      quantity,
    });
    dispatch(updateCartItemSuccess(response.data));
  } catch (error) {
    dispatch(updateCartItemFailure(error.response?.data || 'خطا در به‌روزرسانی'));
  }
};

// Clear Cart Thunk
export const clearCartThunk = () => (dispatch) => {
  dispatch(clearCart());
};

// Get Current Cart Thunk
export const getCart = () => async (dispatch) => {
  dispatch(getCartRequest());
  try {
    const response = await axiosConfig.get('http://localhost/api/v1/cart/');
    dispatch(getCartSuccess(response.data));
  } catch (error) {
    dispatch(getCartFailure(error.response?.data || 'خطا در دریافت سبد خرید'));
  }
};

// Get Cart List Thunk
export const getCartList = () => async (dispatch) => {
  dispatch(getCartListRequest());
  try {
    const response = await axiosConfig.get('/v1/cart/list/');
    dispatch(getCartListSuccess(response.data));
  } catch (error) {
    dispatch(getCartListFailure(error.response?.data || 'An error occurred'));
  }
};