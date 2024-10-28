import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import productsSlice from "../features/product/productSlice";
import { formApiSlice } from "../features/form/formApiSlice";
import apiSlice from "./api/apiSlice";

const persistConfig = {
    key: "auth",
    storage,
    debug: true
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [formApiSlice.reducerPath]: formApiSlice.reducer,
        auth: persistedAuthReducer,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, formApiSlice.middleware)
});

export const persistor = persistStore(store);