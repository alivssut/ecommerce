import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
    VERIFY_TOKEN_REQUEST, VERIFY_TOKEN_SUCCESS, VERIFY_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE
  } from './authTypes';
  
  export const loginRequest = () => ({ type: LOGIN_REQUEST });
  export const loginSuccess = (token, user) => ({ type: LOGIN_SUCCESS, payload: { token, user } });
  export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
  export const logout = () => ({ type: LOGOUT });
  
  export const verifyTokenRequest = () => ({ type: VERIFY_TOKEN_REQUEST });
  export const verifyTokenSuccess = (token) => ({ type: VERIFY_TOKEN_SUCCESS, payload: token });
  export const verifyTokenFailure = (error) => ({ type: VERIFY_TOKEN_FAILURE, payload: error });
  
  export const refreshTokenRequest = () => ({ type: REFRESH_TOKEN_REQUEST });
  export const refreshTokenSuccess = (token) => ({ type: REFRESH_TOKEN_SUCCESS, payload: token });
  export const refreshTokenFailure = (error) => ({ type: REFRESH_TOKEN_FAILURE, payload: error });
  