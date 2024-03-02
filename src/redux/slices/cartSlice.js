import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    removeSingleFromCart: (state, action) => {
      let existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem.selectedQty === 1) {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        existingItem.selectedQty -= 1;
      }
    }
    
  },
});
export const { addToCart, removeFromCart, removeSingleFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
