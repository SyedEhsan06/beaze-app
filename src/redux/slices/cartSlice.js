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
      const existingItemIndex = state.cart.findIndex(item => item.p_id === action.payload.p_id);
      if (existingItemIndex !== -1) {
          state.cart[existingItemIndex].selectedQty += action.payload.selectedQty;
      }
    else{
      state.cart.push(action.payload);
    }
    },
    hanldleIncrement: (state, action) => {
      const existingItem = state.cart.find(item => item.p_id === action.payload.p_id);
      if (existingItem) {
        existingItem.selectedQty += 1;
       
      }
    }
    ,
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.p_id !== action.payload.p_id);
    },
    removeSingleFromCart: (state, action) => {
      let existingItem = state.cart.find(
        (item) => item.p_id === action.payload.p_id
      );
      if (existingItem.selectedQty === 1) {
        state.cart = state.cart.filter(
          (item) => item.p_id !== action.payload.p_id
        );
      } else {
        existingItem.selectedQty -= 1;
        
      }
      
    }
    ,
    emptyCart: (state, action) => {
      state.cart = [];
    }
    
  },
});
export const { addToCart, removeFromCart, removeSingleFromCart 
, hanldleIncrement
, emptyCart
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
