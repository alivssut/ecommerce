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
  
  const initialState = {
    addresses: [],
    loading: false,
    error: null,
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADDRESSES_REQUEST:
      case ADD_ADDRESS_REQUEST:
      case UPDATE_ADDRESS_REQUEST:
      case DELETE_ADDRESS_REQUEST:
      case SET_DEFAULT_ADDRESS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ADDRESSES_SUCCESS:
        return { ...state, loading: false, addresses: action.payload };
      case ADD_ADDRESS_SUCCESS:
        return { ...state, loading: false, addresses: [...state.addresses, action.payload] };
      case UPDATE_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: state.addresses.map(addr =>
            addr.id === action.payload.id ? action.payload : addr
          ),
        };
      case DELETE_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: state.addresses.filter(addr => addr.id !== action.payload),
        };
      case SET_DEFAULT_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: state.addresses.map(addr => ({
            ...addr,
            selected: addr.id === action.payload.id,
          })),
        };
      case FETCH_ADDRESSES_FAILURE:
      case ADD_ADDRESS_FAILURE:
      case UPDATE_ADDRESS_FAILURE:
      case DELETE_ADDRESS_FAILURE:
      case SET_DEFAULT_ADDRESS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default addressReducer;