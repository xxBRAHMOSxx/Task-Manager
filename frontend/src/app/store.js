import { apiSlice } from "./api/apiSlice";

const { configureStore } = require("@reduxjs/toolkit");


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})