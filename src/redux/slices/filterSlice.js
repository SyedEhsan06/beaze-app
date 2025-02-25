import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  category: [],
  subcategory: [],
  color: [],
  categoryCall: '',
  size: [],
  material: [],
  fix: [],
  sleeve: [],
  search: '',
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
    toggleFix: (state, action) => {
      toggleFilter(state, action, "fix");
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
    toggleCategoryCall: (state, action) => {
      state.categoryCall = action.payload;
    },
    addSearch: (state, action) => {
      state.search = action.payload;
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
  toggleFix,
  addMultiSubcategory,
  addMultiCategory,
  addSearch,
  toggleCategoryCall,
} = filterSlice.actions;
export const selectCategory = (state) => state.filter.category;
export const selectColor = (state) => state.filter.color;
export const selectSize = (state) => state.filter.size;
export const selectMaterial = (state) => state.filter.material;
export const selectSleeve = (state) => state.filter.sleeve;
export const selectSubcategory = (state) => state.filter.subcategory;
export const selectFix = (state) => state.filter.fix;
export const selectSearch = (state) => state.filter.search;
export const selectCategoryCall = (state) => state.filter.categoryCall;
export default filterSlice.reducer;
