import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
