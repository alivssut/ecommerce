import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  CLEAR_CART,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_LIST_REQUEST,
  GET_CART_LIST_SUCCESS,
  GET_CART_LIST_FAILURE,
  RESET_CART_SUCCESS,
} from './cartTypes';

// Add to Cart
export const addToCartRequest = () => ({
  type: ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = (item) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: item,
});

export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const resetCartSuccess = () => ({
  type: RESET_CART_SUCCESS,
});

// Remove from Cart
export const removeFromCartRequest = () => ({
  type: REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = (itemId) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: itemId,
});

export const removeFromCartFailure = (error) => ({
  type: REMOVE_FROM_CART_FAILURE,
  payload: error,
});

// Update Cart Item
export const updateCartItemRequest = () => ({
  type: UPDATE_CART_ITEM_REQUEST,
});

export const updateCartItemSuccess = (item) => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  payload: item,
});

export const updateCartItemFailure = (error) => ({
  type: UPDATE_CART_ITEM_FAILURE,
  payload: error,
});

// Clear Cart
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Get Current Cart
export const getCartRequest = () => ({
  type: GET_CART_REQUEST,
});

export const getCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart,
});

export const getCartFailure = (error) => ({
  type: GET_CART_FAILURE,
  payload: error,
});

// Get Cart List
export const getCartListRequest = () => ({
  type: GET_CART_LIST_REQUEST,
});

export const getCartListSuccess = (cartList) => ({
  type: GET_CART_LIST_SUCCESS,
  payload: cartList,
});

export const getCartListFailure = (error) => ({
  type: GET_CART_LIST_FAILURE,
  payload: error,
});
