import {configureStore} from "@reduxjs/toolkit";
import noteSlice from "../slice/NoteSlice";
import userSlice from "../slice/UserSlice.ts";

export const store = configureStore({
    reducer: {
        note : noteSlice,
        user : userSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;