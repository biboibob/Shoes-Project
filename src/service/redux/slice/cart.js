import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    /* Format */
    // {
    //     name: "nameShoes",
    //     size: "41",
    //     color: "black",
    //     price: "160",
    //     discount: "150",
    //     addToCart: 2,
    //     Note: ""
    // }
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewShoes: (state, action) => {
      const shoesInState = state.data.find(
        (val) => val.name === action.payload.name
      );

      if (shoesInState) {
        state.data = state.data.map((val) => {
          if (val.name === action.payload.name) {
            val.addToCart += action.payload.addToCart;
          }
          return val;
        });
      } else {
        state.data.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const indexShoe = state.data.findIndex((val) => val.name === action.payload);
      state.data.splice(indexShoe, 1);
    },
    removeAllCart: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewShoes, removeAllCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
