import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: localStorage.getItem("user_id") ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user_id = action.payload.user_id;

      localStorage.setItem("user_id", action.payload.user_id);

      return state;
    },
  },
});

export const { loginAction } = authSlice.actions;
export default authSlice.reducer;
