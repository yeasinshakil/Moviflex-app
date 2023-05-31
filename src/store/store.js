import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        home: homeSlice,
    }
})