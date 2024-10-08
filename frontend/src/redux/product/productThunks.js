import {
    fetchProductsByCategoryRequest,
    fetchProductsByCategorySuccess,
    fetchProductsByCategoryFailure,
  } from './productActions';
  import axios from 'axios';
  
  export const fetchProductsByCategory = (category_slug) => async (dispatch) => {
    dispatch(fetchProductsByCategoryRequest());
    try {
      const response = await axios.get(`http://localhost/api/v1/product-category/${category_slug}/`);
      const { count, next, previous, results } = response.data;
      dispatch(fetchProductsByCategorySuccess({ count, next, previous, products: results }));
    } catch (error) {
      dispatch(fetchProductsByCategoryFailure(error.message));
    }
  };