import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import cartOpenReducer from './slices/cartOpenSlice';
import userReducer from './slices/userData.slice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart','filter'],
};

const rootReducer = combineReducers({
    userData: userReducer,
    cartOpen: cartOpenReducer,
    cart: cartReducer,
    filter: filterReducer,
    categories: categoryReducer,
    products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export default store;
export { persistor };
