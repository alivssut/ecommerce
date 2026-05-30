import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
import profilehReducer from './profile/profileReducer'
import addressReducer from './address/addressReducer'
import cartReducer from './cart/cartReducer';
import categoryReducer from './category/categoryReducer';
import productReducer from './product/productReducer';
import orderReducer from './order/orderReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    profile: profilehReducer,
    address: addressReducer,
    order: orderReducer
  }
})
export default store
