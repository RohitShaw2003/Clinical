import { configureStore } from "@reduxjs/toolkit";
import { AlertSlice } from "./Features/AlertSlice";
import { userSlice } from "./Features/UserSlice";

export default configureStore({
  reducer: {
    alerts: AlertSlice.reducer,
    user: userSlice.reducer,
  },
});
