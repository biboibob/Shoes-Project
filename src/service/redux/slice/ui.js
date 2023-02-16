import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBar: false,
  skeleton: false,
  specificSkeleton: {
    shoesListCategory: false,
    shoesCatalog: false,
  },
  isLoading: false,
};

export const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    sideBarToggle: (state, action) => {
      state.isSideBar = action.payload;
    },
    skeletonToggle: (state, action) => {
      state.skeleton = action.payload;
    },
    specificSkeletonToggle: (state, action) => {
      state.specificSkeleton = {
        ...state.specificSkeleton,
        ...action.payload,
      };
    },
    loadingToggle: (state, action) => {
      state.isLoading = action.payload;
    },
    resetUI: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  sideBarToggle,
  skeletonToggle,
  specificSkeletonToggle,
  loadingToggle,
  resetUI,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
