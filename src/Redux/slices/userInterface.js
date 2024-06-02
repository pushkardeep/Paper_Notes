import { createSlice } from "@reduxjs/toolkit";

const userInterface = createSlice({
  name: "userInterface",
  initialState: {
    createWindowOpen: false,
    editWindowOpen: false,
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
    toogleEdit: (state) => {
      state.editWindowOpen = !state.editWindowOpen;
    },
    toogleRead: (state) => {
      state.readingWindowOpen = !state.readingWindowOpen;
    },
    toogleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const {
  toogleCreateWindow,
  toogleDelete,
  toogleEdit,
  toogleRead,
  toogleLoading,
} = userInterface.actions;
export default userInterface.reducer;
