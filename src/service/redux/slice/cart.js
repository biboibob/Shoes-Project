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
        (val) =>
          val.name === action.payload.name &&
          val.color === action.payload.color &&
          val.size === action.payload.size
      );

      if (shoesInState) {
        state.data = state.data.map((val) => {
          if (
            val.name === action.payload.name &&
            val.color === action.payload.color &&
            val.size === action.payload.size
          ) {
            val.addToCart += action.payload.addToCart;
          }
          return val;
        });
      } else {
        state.data.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      // Action In Form Of Array and Received Index

      state.data = state.data.filter((val, idx) => {
        const result = action.payload.some((valFind) => valFind === idx);
      
        if (!result) {
          return val;
        }
      });
      // action.payload.map((valMap) => {
      //   // const indexShoe = state.data.findIndex((val) => val.name === valMap);
      //   state.data.splice(valMap, 1);
      // });
    },
    removeAllCart: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewShoes, removeAllCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
