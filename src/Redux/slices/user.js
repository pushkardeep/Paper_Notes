import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    email: null,
  },
  reducers: {
    setuser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    removeUser: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setuser, removeUser } = userSlice.actions;
export default userSlice.reducer;
