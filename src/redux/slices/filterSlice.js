import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  category: [],
  subcategory: [],
  color: [],
  size: [],
  material: [],
  sleeve: [],
  status: "idle",
};

// Generic function to toggle filters
const toggleFilter = (state, action, filterKey) => {
  if (Array.isArray(action.payload) && action.payload.length === 0) {
    state[filterKey] = [];
  } else {
    const filterIndex = state[filterKey].findIndex(
      (item) => item === action.payload
    );
    if (filterIndex === -1) {
      state[filterKey].push(action.payload);
    } else {
      state[filterKey].splice(filterIndex, 1);
    }
  }
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      toggleFilter(state, action, "category");
    },
    toggleColor: (state, action) => {
      toggleFilter(state, action, "color");
    },
    toggleSize: (state, action) => {
      toggleFilter(state, action, "size");
    },
    toggleMaterial: (state, action) => {
      toggleFilter(state, action, "material");
    },
    toggleSleeve: (state, action) => {
      toggleFilter(state, action, "sleeve");
    },
    toggleSubcategory: (state, action) => {
      toggleFilter(state, action, "subcategory");
    },
    addMultiSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    addMultiCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  toggleCategory,
  toggleColor,
  toggleSize,
  toggleMaterial,
  toggleSleeve,
  toggleSubcategory,
  addMultiSubcategory,
  addMultiCategory,
} = filterSlice.actions;

export const selectCategory = (state) => state.filter.category;
export const selectColor = (state) => state.filter.color;
export const selectSize = (state) => state.filter.size;
export const selectMaterial = (state) => state.filter.material;
export const selectSleeve = (state) => state.filter.sleeve;
export const selectSubcategory = (state) => state.filter.subcategory;

export default filterSlice.reducer;
