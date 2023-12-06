import { configureStore } from "@reduxjs/toolkit";
import { materialesSlice } from "../features/materiales/materialesSlice";

export const store = configureStore({
  reducer: {

    materiales: materialesSlice.reducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;