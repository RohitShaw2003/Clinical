import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearNotifications: (state) => {
      if (state.user) {
        state.user.notification = [];
        state.user.sennnotification = [];
      }
    },
  },
});

export const { setUser, clearNotifications } = userSlice.actions;
export default userSlice.reducer;
