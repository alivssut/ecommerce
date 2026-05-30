import axiosConfig from '../../axiosConfig';
import * as actions from './orderActions';

const API_BASE = 'http://localhost/api/v1';

export const fetchOrders = () => async (dispatch) => {
  dispatch(actions.fetchOrdersRequest());
  try {
    const response = await axiosConfig.get(`${API_BASE}/orders/`);
    dispatch(actions.fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(actions.fetchOrdersFailure(error.response?.data || 'خطا در دریافت سفارش‌ها'));
  }
};

export const createOrder = (addressId) => async (dispatch) => {
  dispatch(actions.createOrderRequest());
  try {
    const response = await axiosConfig.post(`${API_BASE}/orders/create/`, { address_id: addressId });
    dispatch(actions.createOrderSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(actions.createOrderFailure(error.response?.data || 'خطا در ثبت سفارش'));
    throw error.response?.data;
  }
};

export const fetchOrderDetail = (orderId) => async (dispatch) => {
  dispatch(actions.fetchOrderDetailRequest());
  try {
    const response = await axiosConfig.get(`${API_BASE}/orders/${orderId}/`);
    dispatch(actions.fetchOrderDetailSuccess(response.data));
  } catch (error) {
    dispatch(actions.fetchOrderDetailFailure(error.response?.data || 'خطا در دریافت جزئیات سفارش'));
  }
};