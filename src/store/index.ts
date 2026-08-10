import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./slices/uiSlice";
import searchPropertiesReducer from "./slices/searchPropertiesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    searchProperties: searchPropertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
