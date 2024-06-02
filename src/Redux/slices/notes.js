import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: undefined,
    deleteID: "",
    setEditData: {
      id: "",
      title: "",
      text: "",
    },
    readingData: {
      title: "",
      text: "",
    },
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action) => {
      const updatedNotes = state.notes.filter((elem) => {
        return elem._id !== action.payload._id;
      });
      state.notes = updatedNotes;
    },

    editNote: (state, action) => {
      state.notes = state.notes.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        } else {
          return elem;
        }
      });
    },

    setReaderData: (state, action) => {
      state.readingData = { ...state.readingData, ...action.payload };
    },

    setDeleteNoteID: (state, action) => {
      state.deleteID = action.payload;
    },

    setEditNoteData: (state, action) => {
      state.setEditData = { ...state.setEditData, ...action.payload };
    },
  },
});

export default noteSlice.reducer;
export const {
  setNotes,
  addNotes,
  deleteNote,
  editNote,
  setReaderData,
  setDeleteNoteID,
  setEditNoteData,
} = noteSlice.actions;
