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
  toogleDelete,
  toogleEdit,
  toogleLoading,
} from "../../Redux/slices/userInterface";

const profile = async (dispatch, token, navigate) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(null, "POST", endpoints.PROFILE_API, token);
    if (data.success) {
      dispatch(toogleLoading());
      dispatch(setuser(data.user));
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

const getNotes = async (dispatch, token, navigate) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(null, "POST", endpoints.GET_NOTES_API, token);
    if (data.success) {
      dispatch(toogleLoading());
      dispatch(setNotes(data.notes));
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

const createNotes = async (formData, dispatch, token, navigate) => {
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
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
      return false;
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

const deleteNotes = async (dispatch, token, cardID, navigate) => {
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
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

const updateNotes = async (updatedData, dispatch, token, navigate) => {
  try {
    dispatch(toogleLoading());
    const data = await fetch(
      updatedData,
      "POST",
      endpoints.EDIT_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(toogleLoading());
      dispatch(editNote(data.updatedNote));
      return true;
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

const searchNote = async (search, dispatch, token, navigate) => {
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
    } else if (data.success === false) {
      dispatch(toogleLoading());
      navigate("/error");
    }
  } catch (error) {
    dispatch(toogleLoading());
    navigate("/error");
  }
};

export { profile, createNotes, getNotes, deleteNotes, updateNotes, searchNote };
