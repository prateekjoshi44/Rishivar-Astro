import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rishivarSlice } from "./rishivarSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const persistConfig = {
  key: "rishivar-astro-react-app903",
  storage,
  // whitelist: ['auth'] // only 'auth' will be persisted
};


const auth = persistReducer(persistConfig, authReducer);

const reducer = combineReducers({
  auth,
  [rishivarSlice.reducerPath]: rishivarSlice.reducer,
});

export const store = configureStore({
  reducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rishivarSlice.middleware),
});

setupListeners(store.dispatch);
