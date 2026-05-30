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
  
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
      case CREATE_ORDER_REQUEST:
      case FETCH_ORDER_DETAIL_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_ORDERS_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
  
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, currentOrder: action.payload };
  
      case FETCH_ORDER_DETAIL_SUCCESS:
        return { ...state, loading: false, currentOrder: action.payload };
  
      case FETCH_ORDERS_FAILURE:
      case CREATE_ORDER_FAILURE:
      case FETCH_ORDER_DETAIL_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case CLEAR_ORDER:
        return { ...state, currentOrder: null };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;