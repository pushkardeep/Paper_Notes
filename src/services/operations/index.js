import { fetch } from "../../utils/fetch";
import { setuser } from "../../Redux/slices/user";
import { endpoints } from "../apis";
import { toogleDelete, toogleLoading } from "../../Redux/slices/userInterface";
import {
  addNotes,
  setNotes,
  deleteNote,
  editNote,
} from "../../Redux/slices/notes";

const userData = async (dispatch, navigate, token, search) => {
  try {
    dispatch(toogleLoading(true));
    const userProfile = await fetch(null, "POST", endpoints.PROFILE_API, token);
    const userNotes = search
      ? await fetch(
          { search: search },
          "POST",
          endpoints.SEARCH_NOTE_API,
          token
        )
      : await fetch(null, "POST", endpoints.GET_NOTES_API, token);

    if (userProfile.success && userNotes.success) {
      dispatch(setuser(userProfile.user));
      dispatch(setNotes(userNotes.notes));
    } else {
      localStorage.removeItem("token");
      navigate("/error");
    }
  } catch (error) {
    navigate("/error");
  } finally {
    dispatch(toogleLoading(false));
  }
};

const createNotes = async (formData, dispatch, token, navigate) => {
  try {
    dispatch(toogleLoading(true));
    const data = await fetch(
      formData,
      "POST",
      endpoints.CREATE_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(addNotes(data.newNote));
      return true;
    } else {
      localStorage.removeItem("token");
      navigate("/error");
    }
  } catch (error) {
    navigate("/error");
    return false;
  } finally {
    dispatch(toogleLoading(false));
  }
};

const deleteNotes = async (dispatch, token, cardID, navigate) => {
  try {
    dispatch(toogleLoading(true));
    const data = await fetch(
      { id: cardID },
      "POST",
      endpoints.DELETE_NOTE_API,
      token
    );
    if (data.success) {
      dispatch(toogleDelete());
      dispatch(deleteNote(data.deletedNote));
    } else {
      localStorage.removeItem("token");
      navigate("/error");
    }
  } catch (error) {
    navigate("/error");
  } finally {
    dispatch(toogleLoading(false));
  }
};

const updateNotes = async (updatedData, dispatch, token, navigate) => {
  try {
    dispatch(toogleLoading(true));
    const data = await fetch(
      updatedData,
      "POST",
      endpoints.EDIT_NOTE_API,
      token
    );

    if (data.success) {
      dispatch(editNote(data.updatedNote));
      return true;
    } else {
      localStorage.removeItem("token");
      navigate("/error");
    }
  } catch (error) {
    navigate("/error");
  } finally {
    dispatch(toogleLoading(false));
  }
};

export { userData, createNotes, deleteNotes, updateNotes };
