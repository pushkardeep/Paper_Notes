import React from "react";
import Delete from "./Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteNoteID,
  setEditNoteData,
  setReaderData,
} from "../Redux/slices/notes";
import {
  toogleDelete,
  toogleEdit,
  toogleRead,
} from "../Redux/slices/userInterface";

function Cards() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);
  const deleteBar = useSelector((state) => state.ui.deleteBar);
  const cardID = useSelector((state) => state.notes.deleteID);

  const onDelete = (note) => {
    if (note._id) {
      dispatch(setDeleteNoteID(note._id));
    }
  };

  const onEdit = (note) => {
    const data = {
      id: note._id,
      title: note.title,
      text: note.text,
    };
    dispatch(setEditNoteData(data));
  };

  const onRead = (note) => {
    const data = {
      title: note.title,
      text: note.text,
      date: note.date,
    };
    dispatch(setReaderData(data));
  };

  return (
    <>
      <div className="w-full h-fit overflow-hidden relative">
        {notes && notes.length === 0 && (
          <h1 className="text-[#575757] text-[18px] font-semibold text-center mt-44">
            You don't have any Pages.
          </h1>
        )}

        {notes && notes.length > 0 && (
          <h1 className="text-white text-[25px] font-semibold text-center">
            Pages
          </h1>
        )}

        <div className="grid min-h-0 w-fit auto-rows-auto py-7 gap-6 sm:gap-3 px-5 sm:px-2 max-h-[70vh] mx-auto overflow-y-auto min-[350px]:grid-cols-2 min-[510px]:grid-cols-3 min-[635px]:grid-cols-4 min-[725px]:grid-cols-5 min-[860px]:grid-cols-6 min-[1000px]:grid-cols-7 min-[1145px]:grid-cols-8">
          {notes &&
            notes.map((notes) => (
              <div
                key={notes._id}
                id={notes._id}
                className="card w-[120px] scale-[1.1] sm:scale-[1] h-fit overflow-hidden border border-[#9f9f9f] hover:border-[#ffffff] relative rounded-xl sm:rounded-2xl bg-[#303030]"
              >
                <div className="flex justify-between items-center px-3.5 w-full h-fit py-[8px]">
                  <h1
                    onClick={() => {
                      onRead(notes);
                      dispatch(toogleRead());
                    }}
                    className="text-white cursor-pointer text-[13px] font-medium w-[65%] overflow-hidden whitespace-nowrap"
                  >
                    {notes.title}
                  </h1>
                  <span
                    onClick={() => {
                      onDelete(notes);
                      dispatch(toogleDelete());
                    }}
                    className="material-symbols-outlined text-[#b8b8b8] scale-[.85] w-fit cursor-pointer"
                  >
                    more_vert
                  </span>
                </div>

                <div
                  onClick={() => {
                    onRead(notes);
                    dispatch(toogleRead());
                  }}
                  id="textArea"
                  className="w-full cursor-pointer min-h-fit max-h-[55px] overflow-hidden px-3.5 text-[11px] text-[#d4d4d4] font-medium line-clamp-3"
                >
                  {notes.text}
                </div>
                <div className="w-full mt-2 px-3 bg-[#676767af] h-fit py-[1px] flex justify-between items center">
                  <h1
                    onClick={() => {
                      onRead(notes);
                      dispatch(toogleRead());
                    }}
                    className="text-[10px] cursor-pointer font-semibold flex items-center text-white"
                  >
                    {notes.date.split("T")[0]}
                  </h1>
                  <span
                    onClick={() => {
                      onEdit(notes);
                      dispatch(toogleEdit());
                    }}
                    className="material-symbols-outlined scale-[.8] cursor-pointer text-[#bababa]"
                  >
                    edit_note
                  </span>
                </div>

                {deleteBar && cardID === notes._id && <Delete />}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
