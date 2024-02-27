import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import cartOpenReducer from './slices/cartOpenSlice';
import userReducer from './slices/userData.slice';
export default configureStore({
    reducer: {
        userData: userReducer,
        cartOpen:cartOpenReducer,
        cart: cartReducer,
        filter: filterReducer,
        categories: categoryReducer,
        products: productReducer,
    },
});
