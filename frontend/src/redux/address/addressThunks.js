import axiosConfig from '../../axiosConfig';
import * as actions from './addressActions';

const API_BASE = 'http://localhost/api/v1';

export const fetchAddresses = () => async (dispatch) => {
  dispatch(actions.fetchAddressesRequest());
  try {
    const response = await axiosConfig.get(`${API_BASE}/addresses/`);
    dispatch(actions.fetchAddressesSuccess(response.data));
  } catch (error) {
    dispatch(actions.fetchAddressesFailure(error.response?.data));
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  dispatch(actions.addAddressRequest());
  try {
    const response = await axiosConfig.post(`${API_BASE}/addresses/`, addressData);
    dispatch(actions.addAddressSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(actions.addAddressFailure(error.response?.data));
    throw error.response?.data;
  }
};

export const updateAddress = (id, addressData) => async (dispatch) => {
  dispatch(actions.updateAddressRequest());
  try {
    const response = await axiosConfig.put(`${API_BASE}/addresses/${id}/`, addressData);
    dispatch(actions.updateAddressSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(actions.updateAddressFailure(error.response?.data));
    throw error.response?.data;
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  dispatch(actions.deleteAddressRequest());
  try {
    await axiosConfig.delete(`${API_BASE}/addresses/${id}/`);
    dispatch(actions.deleteAddressSuccess(id));
  } catch (error) {
    dispatch(actions.deleteAddressFailure(error.response?.data));
    throw error.response?.data;
  }
};

export const setDefaultAddress = (id) => async (dispatch) => {
  dispatch(actions.setDefaultAddressRequest());
  try {
    const response = await axiosConfig.post(`${API_BASE}/addresses/${id}/set-default/`);
    dispatch(actions.setDefaultAddressSuccess({ id }));
    return response.data;
  } catch (error) {
    dispatch(actions.setDefaultAddressFailure(error.response?.data));
    throw error.response?.data;
  }
};