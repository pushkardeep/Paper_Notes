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
      <div className="w-full h-[80vh] overflow-hidden relative overflow-y-auto">
        {notes && notes.length === 0 && (
          <h1 className="text-[#575757] text-[18px] font-semibold text-center mt-44">
            You don't have any Pages.
          </h1>
        )}

        <div className="px-2 py-2 h-fit w-fit mx-auto grid place-items-center gap-2 min-[360px]:grid-cols-2 min-[525px]:grid-cols-3 min-[695px]:grid-cols-4 min-[875px]:grid-cols-5 min-[1050px]:grid-cols-6 min-[1220px]:grid-cols-7">
          {notes &&
            notes.map((notes) => (
              <div
                key={notes._id}
                id={notes._id}
                className="card relative w-[165px] backdrop-blur-sm bg-[#29292992] rounded-2xl overflow-hidden px-6 py-4 flex flex-col justify-center items-start gap-2"
              >
                {/* title  */}
                <div className="w-full h-fit flex justify-between items-center">
                  <h1
                    onClick={() => {
                      onRead(notes);
                      dispatch(toogleRead());
                    }}
                    className="text-[#EAEAEA] cursor-pointer text-[16.5px] font-semibold w-[70%] overflow-hidden whitespace-nowrap"
                  >
                    {notes.title}
                  </h1>
                  <span
                    onClick={() => {
                      onDelete(notes);
                      dispatch(toogleDelete());
                    }}
                    className="material-symbols-outlined text-[#979797] text-[26.5px] w-fit cursor-pointer"
                  >
                    more_vert
                  </span>
                </div>

                {/* text  */}
                <div
                  onClick={() => {
                    onRead(notes);
                    dispatch(toogleRead());
                  }}
                  id="textArea"
                  className="h-[81px] w-[75%] cursor-pointer text-[13px] text-[#A7A7A7] font-semibold overflow-hidden"
                >
                  {notes.text}
                </div>

                {/* date  */}
                <div className="w-full flex justify-start items-center mt-2">
                  <h1
                    onClick={() => {
                      onRead(notes);
                      dispatch(toogleRead());
                    }}
                    className="text-[10px] cursor-pointer font-medium flex items-center text-[#7b7b7b]"
                  >
                    {notes.date.split("T")[0]}
                  </h1>
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
