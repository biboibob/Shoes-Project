import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "userInfo",
  initialState: {
    id: "",
    username: "",
    role: "",
    email: "",
  },
  reducers: {
    addUser: (state, action) => {
      return{
          ...state,
          ...action.payload
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = counterSlice.actions;

export default counterSlice.reducer;
