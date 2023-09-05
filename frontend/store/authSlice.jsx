import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      // set cookie to expire in 14 days
      const expirationTime = new Date().getTime() + 14 * 86400 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: state => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
