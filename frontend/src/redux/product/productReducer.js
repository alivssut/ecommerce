import {
    FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
    FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
  } from './productTypes';
  
  const initialState = {
    loading: false,
    products: [],
    count: 0,
    next: null,
    previous: null,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_BY_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload.products,
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      case FETCH_PRODUCTS_BY_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  