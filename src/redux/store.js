import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authSlice from './slices/authSlice'
import { patientsApi } from "./apis/patientsApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [patientsApi.reducerPath]: patientsApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, patientsApi.middleware]
})

export default reduxStore