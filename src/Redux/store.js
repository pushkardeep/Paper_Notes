import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import noteSlice from "./slices/notes";
import userInterface from "./slices/userInterface";

export const store = configureStore({
  reducer: {
    user: userSlice,
    notes: noteSlice,
    ui: userInterface,
  },
});
