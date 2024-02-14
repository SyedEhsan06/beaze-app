// import { createSlice } from "@reduxjs/toolkit";
// let initialState = {
//   category: {},
//   subcategory: {},
//   color: {},
//   size: {},
//   material: {},
//   sleeve: {},
//   status: "idle",    
// };

// export const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setCategory: (state, action) => {
//       state.category[action.payload] = !state.category[action.payload];
//     },
//     setColor: (state, action) => {
//       state.color[action.payload] = !state.color[action.payload];
//     },
//     setSize: (state, action) => {
//       state.size[action.payload] = !state.size[action.payload];
//     },
//     setMaterial: (state, action) => {
//       state.material[action.payload] = !state.material[action.payload];
//     },
//     setSleeve: (state, action) => {
//       state.sleeve[action.payload] = !state.sleeve[action.payload];
//     },
//     setSubcategory: (state, action) => {
//       state.subcategory[action.payload] = !state.subcategory[action.payload];
//     },
//   },
// });

// export const { setCategory, setColor, setSize, setMaterial, setSleeve ,setSubcategory} = filterSlice.actions;
// export const selectCategory = (state) => state.filter.category;
// export const selectColor = (state) => state.filter.color;
// export const selectSize = (state) => state.filter.size;
// export const selectMaterial = (state) => state.filter.material;
// export const selectSleeve = (state) => state.filter.sleeve;
// export const selectSubcategory = (state) => state.filter.subcategory;
// export default filterSlice.reducer;


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

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const categoryIndex = state.category.findIndex(
        (item) => item === action.payload
      );
      if (categoryIndex === -1) {
        state.category.push(action.payload);
      } else {
        state.category.splice(categoryIndex, 1);
      }
    },
    toggleColor: (state, action) => {
      const colorIndex = state.color.findIndex((item) => item === action.payload);
      if (colorIndex === -1) {
        state.color.push(action.payload);
      } else {
        state.color.splice(colorIndex, 1);
      }
    },
    toggleSize: (state, action) => {
      const sizeIndex = state.size.findIndex((item) => item === action.payload);
      if (sizeIndex === -1) {
        state.size.push(action.payload);
      } else {
        state.size.splice(sizeIndex, 1);
      }
    },
    toggleMaterial: (state, action) => {
      const materialIndex = state.material.findIndex(
        (item) => item === action.payload
      );
      if (materialIndex === -1) {
        state.material.push(action.payload);
      } else {
        state.material.splice(materialIndex, 1);
      }
    },
    toggleSleeve: (state, action) => {
      const sleeveIndex = state.sleeve.findIndex(
        (item) => item === action.payload
      );
      if (sleeveIndex === -1) {
        state.sleeve.push(action.payload);
      } else {
        state.sleeve.splice(sleeveIndex, 1);
      }
    },
    toggleSubcategory: (state, action) => {
      const subcategoryIndex = state.subcategory.findIndex(
        (item) => item === action.payload
      );
      if (subcategoryIndex === -1) {
        state.subcategory.push(action.payload);
      } else {
        state.subcategory.splice(subcategoryIndex, 1);
      }
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
} = filterSlice.actions;

export const selectCategory = (state) => state.filter.category;
export const selectColor = (state) => state.filter.color;
export const selectSize = (state) => state.filter.size;
export const selectMaterial = (state) => state.filter.material;
export const selectSleeve = (state) => state.filter.sleeve;
export const selectSubcategory = (state) => state.filter.subcategory;

export default filterSlice.reducer;

