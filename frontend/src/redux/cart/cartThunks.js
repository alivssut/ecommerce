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
    dispatch(addToCartFailure(error.response?.data || 'An error occurred'));
  }
};

// Remove from Cart Thunk
export const removeFromCart = (itemId) => async (dispatch) => {
  dispatch(removeFromCartRequest());
  try {
    await axiosConfig.delete(`/cart/remove/${itemId}/`);
    dispatch(removeFromCartSuccess(itemId));
  } catch (error) {
    dispatch(removeFromCartFailure(error.response?.data || 'An error occurred'));
  }
};

// Update Cart Item Thunk
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await axiosConfig.put(`/api/v1/cart/update/${itemId}/`, {
      quantity,
    });
    dispatch(updateCartItemSuccess(response.data));
  } catch (error) {
    dispatch(updateCartItemFailure(error.response?.data || 'An error occurred'));
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
    dispatch(getCartFailure(error.response?.data || 'An error occurred'));
  }
};

// Get Cart List Thunk
export const getCartList = () => async (dispatch) => {
  dispatch(getCartListRequest());
  try {
    const response = await axiosConfig.get('/api/v1/cart/list/');
    dispatch(getCartListSuccess(response.data));
  } catch (error) {
    dispatch(getCartListFailure(error.response?.data || 'An error occurred'));
  }
};