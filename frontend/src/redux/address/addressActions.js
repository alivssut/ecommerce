import {
    FETCH_ADDRESSES_REQUEST,
    FETCH_ADDRESSES_SUCCESS,
    FETCH_ADDRESSES_FAILURE,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    SET_DEFAULT_ADDRESS_REQUEST,
    SET_DEFAULT_ADDRESS_SUCCESS,
    SET_DEFAULT_ADDRESS_FAILURE,
  } from './addressTypes';
  
  export const fetchAddressesRequest = () => ({
    type: FETCH_ADDRESSES_REQUEST,
  });
  
  export const fetchAddressesSuccess = (addresses) => ({
    type: FETCH_ADDRESSES_SUCCESS,
    payload: addresses,
  });
  
  export const fetchAddressesFailure = (error) => ({
    type: FETCH_ADDRESSES_FAILURE,
    payload: error,
  });
  
  export const addAddressRequest = () => ({
    type: ADD_ADDRESS_REQUEST,
  });
  
  export const addAddressSuccess = (address) => ({
    type: ADD_ADDRESS_SUCCESS,
    payload: address,
  });
  
  export const addAddressFailure = (error) => ({
    type: ADD_ADDRESS_FAILURE,
    payload: error,
  });
  
  export const updateAddressRequest = () => ({
    type: UPDATE_ADDRESS_REQUEST,
  });
  
  export const updateAddressSuccess = (address) => ({
    type: UPDATE_ADDRESS_SUCCESS,
    payload: address,
  });
  
  export const updateAddressFailure = (error) => ({
    type: UPDATE_ADDRESS_FAILURE,
    payload: error,
  });
  
  export const deleteAddressRequest = () => ({
    type: DELETE_ADDRESS_REQUEST,
  });
  
  export const deleteAddressSuccess = (id) => ({
    type: DELETE_ADDRESS_SUCCESS,
    payload: id,
  });
  
  export const deleteAddressFailure = (error) => ({
    type: DELETE_ADDRESS_FAILURE,
    payload: error,
  });
  
  export const setDefaultAddressRequest = () => ({
    type: SET_DEFAULT_ADDRESS_REQUEST,
  });
  
  export const setDefaultAddressSuccess = (data) => ({
    type: SET_DEFAULT_ADDRESS_SUCCESS,
    payload: data,
  });
  
  export const setDefaultAddressFailure = (error) => ({
    type: SET_DEFAULT_ADDRESS_FAILURE,
    payload: error,
  });