import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE
} from './authTypes';

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case VERIFY_TOKEN_REQUEST:
      return { ...state, loading: true, error: null };
      
    case LOGIN_SUCCESS:
    case VERIFY_TOKEN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        token: action.payload.token, 
        user: action.payload.user,
        error: null 
      };
      
    case LOGIN_FAILURE:
    case VERIFY_TOKEN_FAILURE:
      return { ...state, loading: false, token: null, user: null, error: action.payload };
      
    case LOGOUT:
      return { ...state, token: null, user: null, error: null };
      
    default:
      return state;
  }
};

export default authReducer;
