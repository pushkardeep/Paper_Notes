import { createSlice } from "@reduxjs/toolkit";

const userInterface = createSlice({
  name: "userInterface",
  initialState: {
    createWindowOpen: false,
    readingWindowOpen: false,
    isLoading: false,
    deleteBar: false,
  },
  reducers: {
    toogleCreateWindow: (state) => {
      state.createWindowOpen = !state.createWindowOpen;
    },
    toogleDelete: (state) => {
      state.deleteBar = !state.deleteBar;
    },
    toogleRead: (state) => {
      state.readingWindowOpen = !state.readingWindowOpen;
    },
    toogleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { toogleCreateWindow, toogleDelete, toogleRead, toogleLoading } =
  userInterface.actions;
export default userInterface.reducer;
