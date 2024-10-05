import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
import cartReducer from './cart/cartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
})
export default store
