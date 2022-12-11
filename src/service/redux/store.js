import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userInfo from "./slice/user";
import userInterface from "./slice/ui"
import cart from "./slice/cart"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//Add New Reducer Here
const rootReducer = combineReducers({
  userInfo,
  userInterface,
  cart
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const store = storeConfig;
export const persistor = persistStore(store);
