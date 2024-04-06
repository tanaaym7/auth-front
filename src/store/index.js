import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      return { ...state, isLoggedIn: true };
    },
    logout(state) {
      return { ...state, isLoggedIn: false };
    },
  },
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

