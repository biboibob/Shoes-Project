import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBar: false,
  skeleton: false,
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
    }
  },
});

// Action creators are generated for each case reducer function
export const { sideBarToggle, skeletonToggle } = userInterfaceSlice.actions;


export default userInterfaceSlice.reducer;
