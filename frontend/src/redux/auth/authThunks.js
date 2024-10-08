import axiosInstance from '../../axiosConfig';
import { loginRequest, loginSuccess, loginFailure, logout } from './authActions';

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axiosInstance.post('http://localhost/api/dj-rest-auth/login/', {
        username,
        password,
      });

      localStorage.setItem('jwtToken', response.data.access);
      dispatch(loginSuccess(response.data.access));
    } catch (error) {
      dispatch(loginFailure(error.response ? error.response.data : 'An error occurred'));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(logout());
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      dispatch(logout());
      return;
    }

    try {
      const response = await axiosInstance.post('http://localhost/api/dj-rest-auth/token/verify/', {
        token: token,
      });

      if (response.status === 200) {
        dispatch(loginSuccess(token));
      }
    } catch (error) {
      dispatch(logout());
    }
  };
};
