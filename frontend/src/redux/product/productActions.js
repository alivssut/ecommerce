import {
    FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
    FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
  } from './productTypes';
  
  export const fetchProductsByCategoryRequest = () => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_REQUEST,
  });
  
  export const fetchProductsByCategorySuccess = (data) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: data,
  });
  
  export const fetchProductsByCategoryFailure = (error) => ({
    type: FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
    payload: error,
  });
  