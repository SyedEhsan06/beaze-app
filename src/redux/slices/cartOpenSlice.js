import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const cartOpenSlice = createSlice({
  name: 'cartOpen',
  initialState,
  reducers: {
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const { openCart, closeCart } = cartOpenSlice.actions;
export const selectCartOpen = (state) => state.cartOpen.isOpen;
export default cartOpenSlice.reducer;
