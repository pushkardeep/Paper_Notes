import { setuser } from "../../Redux/slices/user";
import { fetch } from "../../utils/fetch";
import { endpoints } from "../apis";
import {
  addNotes,
  setNotes,
  deleteNote,
  editNote,
} from "../../Redux/slices/notes";
import {
  toogleCreateWindow,
  toogleDelete,
  toogleEdit,
  toogleLoading,
} from "../../Redux/slices/userInterface";

const profile = async (dispatch, token) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(null, "POST", endpoints.PROFILE_API, token);
    if (data.success) {
      dispatch(toogleLoading());
      dispatch(setuser(data.user));
    }
  } catch (error) {
    dispatch(toogleLoading());
    console.log("profile error");
  }
};

const getNotes = async (dispatch, token) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(null, "POST", endpoints.GET_NOTES_API, token);
    if (data.success) {
      dispatch(toogleLoading());
      dispatch(setNotes(data.notes));
    } else {
      dispatch(toogleLoading());
      console.log("you have some internal server error");
    }
  } catch (error) {
    console.log("you have error in fetching notes");
  }
};

const createNotes = async (formData, dispatch, token) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(
      formData,
      "POST",
      endpoints.CREATE_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(toogleLoading());
      dispatch(addNotes(data.newNote));
      return true;
    }
  } catch (error) {
    dispatch(toogleLoading());
    console.log("you have a error in creating notes", error);
  }
};

const deleteNotes = async (dispatch, token, cardID) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(
      { id: cardID },
      "POST",
      endpoints.DELETE_NOTE_API,
      token
    );
    if (data.success) {
      dispatch(toogleDelete());
      dispatch(toogleLoading());
      dispatch(deleteNote(data.deletedNote));
    }
  } catch (error) {
    dispatch(toogleLoading());
    console.log(error);
  }
};

const updateNotes = async (updatedData, dispatch, token) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(
      updatedData,
      "POST",
      endpoints.EDIT_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(toogleEdit());
      dispatch(toogleLoading());
      dispatch(editNote(data.updatedNote));
    }
  } catch (error) {
    dispatch(toogleLoading());
    console.log("you have error in updating notes");
  }
};

const searchNote = async (search, dispatch, token) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(
      { search: search },
      "POST",
      endpoints.SEARCH_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(toogleLoading());
      dispatch(setNotes(data.notes));
    }
  } catch (error) {
    dispatch(toogleLoading());
    console.log("you have error in searching note");
  }
};

export { profile, createNotes, getNotes, deleteNotes, updateNotes, searchNote };
