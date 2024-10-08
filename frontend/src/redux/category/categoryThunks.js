import axios from 'axios';
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from './categoryActions';

// Fetch categories from the server
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await axios.get('http://localhost/api/v1/category-list/');
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};
