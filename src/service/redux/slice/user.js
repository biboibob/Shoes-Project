import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: null,
};

export const counterSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.loginData = action.payload;
    },
    removeUser: (state, action) => {
      state.loginData = null;
    },
    resetUser: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, resetUser } = counterSlice.actions;

export default counterSlice.reducer;
