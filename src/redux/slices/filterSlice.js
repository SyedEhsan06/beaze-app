import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  category: {},
  subcategory: {},
  color: {},
  size: {},
  material: {},
  sleeve: {},
  status: "idle",    
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category[action.payload] = !state.category[action.payload];
    },
    setColor: (state, action) => {
      state.color[action.payload] = !state.color[action.payload];
    },
    setSize: (state, action) => {
      state.size[action.payload] = !state.size[action.payload];
    },
    setMaterial: (state, action) => {
      state.material[action.payload] = !state.material[action.payload];
    },
    setSleeve: (state, action) => {
      state.sleeve[action.payload] = !state.sleeve[action.payload];
    },
    setSubcategory: (state, action) => {
      state.subcategory[action.payload] = !state.subcategory[action.payload];
    },
  },
});

export const { setCategory, setColor, setSize, setMaterial, setSleeve ,setSubcategory} = filterSlice.actions;
export const selectCategory = (state) => state.filter.category;
export const selectColor = (state) => state.filter.color;
export const selectSize = (state) => state.filter.size;
export const selectMaterial = (state) => state.filter.material;
export const selectSleeve = (state) => state.filter.sleeve;
export const selectSubcategory = (state) => state.filter.subcategory;
export default filterSlice.reducer;


