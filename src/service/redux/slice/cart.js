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
  onAllowSummary: false,
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
          val.size_detail_shoe === action.payload.size_detail_shoe
      );

      if (shoesInState) {
        state.data = state.data.map((val) => {
          if (
            val.name === action.payload.name &&
            val.color === action.payload.color &&
            val.size_detail_shoe === action.payload.size_detail_shoe
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
    onEditQuantityShoe: (state, action) => {
      state.data = state.data.map((val) => {
        if (
          val.id_shoes === action.payload.id_shoes &&
          val.color === action.payload.color &&
          val.size_detail_shoe === action.payload.size_detail_shoe
        ) {
          val.addToCart = action.payload.updatedStock;
        }

        return val
      });
    },
    removeAllCart: (state, action) => {
      state.data = [];
    },
    onAllowSummaryReducer: (state, action) => {
      state.onAllowSummary = action.payload;
    },
    onSelectShoesOnCart: (state, action) => {
      state.data[action.payload.index].onSelected = action.payload.value;
    },
    onSelectAllShoesOnCart: (state, action) => {
      if (action.payload === false) {
        state.data.map((_, idx) => {
          state.data[idx].onSelected = false;
        });
      } else {
        state.data.map((_, idx) => {
          state.data[idx].onSelected = true;
        });
      }
    },
    onRemoveAfterBuy: (state, action) => {
      state.data = action.payload;
    },
    resetCart: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewShoes,
  removeAllCart,
  removeItem,
  onAllowSummaryReducer,
  onSelectShoesOnCart,
  onSelectAllShoesOnCart,
  resetCart,
  onRemoveAfterBuy,
  onEditQuantityShoe
} = cartSlice.actions;

export default cartSlice.reducer;
