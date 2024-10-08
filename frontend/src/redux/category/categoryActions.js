import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from './categoryTypes';
  
  // Fetch Categories Request
  export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
  });
  
  // Fetch Categories Success
  export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  });
  
  // Fetch Categories Failure
  export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  });
  