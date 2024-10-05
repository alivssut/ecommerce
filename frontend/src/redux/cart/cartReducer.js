import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  CLEAR_CART,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_LIST_REQUEST,
  GET_CART_LIST_SUCCESS,
  GET_CART_LIST_FAILURE,
  RESET_CART_SUCCESS,
} from './cartTypes';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  currentCart: null,  // برای سبد فعلی
  cartList: [],  // برای لیست سبدها
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case REMOVE_FROM_CART_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case GET_CART_REQUEST:
    case GET_CART_LIST_REQUEST:
      return { ...state, loading: true };

      case ADD_TO_CART_SUCCESS:
        // Check if the item already exists in the cart
        const existingItem = state.cartItems.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          // Update the quantity if the item exists
          return {
            ...state,
            loading: false,
            cartError: null,  // Clear any previous cart errors
            cartItems: state.cartItems.map((item) =>
              item.id === action.payload.id ? action.payload : item
            ),
            cartSuccess: true, 
          };
        } else {
          // Add new item if it doesn't exist
          return {
            ...state,
            loading: false,
            cartError: null,  // Clear any previous cart errors
            cartItems: [...state.cartItems, action.payload],
            cartSuccess: true, 
          };
        }

    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        cartError: action.payload,  // Set the error message in state
        cartSuccess: false,
      };
    case RESET_CART_SUCCESS:
        return {
          ...state,
          cartSuccess: false,  // Reset cart success after showing the message
        };
      
    case REMOVE_FROM_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case GET_CART_FAILURE:
    case GET_CART_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCart: action.payload,
      };

    case GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: action.payload,
      };

    case CLEAR_CART:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

export default cartReducer;
