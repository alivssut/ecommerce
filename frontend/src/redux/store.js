import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
import cartReducer from './cart/cartReducer';
import categoryReducer from './category/categoryReducer';
import productReducer from './product/productReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer
  }
})
export default store
