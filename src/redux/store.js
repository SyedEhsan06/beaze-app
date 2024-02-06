import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import filterReducer from './slices/filterSlice';
export default configureStore({
    reducer: {
        filter: filterReducer,
        categories: categoryReducer,
        products: productReducer,
    },
});
