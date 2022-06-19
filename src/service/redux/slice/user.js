import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  role: "",
  email: "",
};

export const counterSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUser: (state, action) => {
      state = Object.keys(state).forEach(key => {
        state[key] = "";
      });;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = counterSlice.actions;

export default counterSlice.reducer;
