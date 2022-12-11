import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBar: false,
};

export const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    sideBarToggle: (state, action) => {
      state.isSideBar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sideBarToggle } = userInterfaceSlice.actions;


export default userInterfaceSlice.reducer;
