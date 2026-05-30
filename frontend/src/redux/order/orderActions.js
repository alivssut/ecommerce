import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    FETCH_ORDER_DETAIL_REQUEST,
    FETCH_ORDER_DETAIL_SUCCESS,
    FETCH_ORDER_DETAIL_FAILURE,
    CLEAR_ORDER,
  } from './orderTypes';
  
  export const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
  export const fetchOrdersSuccess = (orders) => ({ type: FETCH_ORDERS_SUCCESS, payload: orders });
  export const fetchOrdersFailure = (error) => ({ type: FETCH_ORDERS_FAILURE, payload: error });
  
  export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
  export const createOrderSuccess = (order) => ({ type: CREATE_ORDER_SUCCESS, payload: order });
  export const createOrderFailure = (error) => ({ type: CREATE_ORDER_FAILURE, payload: error });
  
  export const fetchOrderDetailRequest = () => ({ type: FETCH_ORDER_DETAIL_REQUEST });
  export const fetchOrderDetailSuccess = (order) => ({ type: FETCH_ORDER_DETAIL_SUCCESS, payload: order });
  export const fetchOrderDetailFailure = (error) => ({ type: FETCH_ORDER_DETAIL_FAILURE, payload: error });
  
  export const clearOrder = () => ({ type: CLEAR_ORDER });