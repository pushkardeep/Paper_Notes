import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteNoteID, setEditNoteData } from "../Redux/slices/notes";
import { toogleDelete, toogleRead } from "../Redux/slices/userInterface";
import Delete from "./Delete";
import { useNavigate } from "react-router-dom";

function Cards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes.notes);
  const deleteBar = useSelector((state) => state.ui.deleteBar);
  const cardID = useSelector((state) => state.notes.deleteID);

  const handleDelete = (noteId) => {
    dispatch(setDeleteNoteID(noteId));
    dispatch(toogleDelete());
  };

  const handleRead = (note) => {
    dispatch(
      setEditNoteData({
        id: note._id,
        title: note.title,
        text: note.text,
        date: note.date,
      })
    );
    dispatch(toogleRead());
  };

  return (
    <>
      <div className="w-full h-[80vh] overflow-hidden relative overflow-y-auto">
        {notes && notes.length === 0 ? (
          <h1 className="text-[#575757] text-[18px] font-semibold text-center mt-44">
            You don't have any Pages.
          </h1>
        ) : (
          <div className="px-2 py-2 h-fit w-fit mx-auto grid place-items-center gap-2 min-[360px]:grid-cols-2 min-[525px]:grid-cols-3 min-[695px]:grid-cols-4 min-[875px]:grid-cols-5 min-[1050px]:grid-cols-6 min-[1220px]:grid-cols-7">
            {notes &&
              notes.map((note) => (
                <div
                  key={note._id}
                  className="card relative w-[165px] backdrop-blur-sm bg-[#29292992] rounded-2xl overflow-hidden px-6 py-4 flex flex-col justify-center items-start gap-2"
                >
                  <div className="w-full h-fit flex justify-between items-center">
                    <h1
                      onClick={() => handleRead(note)}
                      className="text-[#EAEAEA] cursor-pointer text-[16.5px] font-semibold w-[70%] overflow-hidden whitespace-nowrap"
                    >
                      {note.title}
                    </h1>
                    <span
                      onClick={() => handleDelete(note._id)}
                      className="material-symbols-outlined text-[#979797] text-[26.5px] w-fit cursor-pointer"
                    >
                      more_vert
                    </span>
                  </div>
                  <div
                    onClick={() => handleRead(note)}
                    className="h-[81px] w-[75%] cursor-pointer text-[13px] text-[#A7A7A7] font-semibold overflow-hidden"
                  >
                    {note.text}
                  </div>
                  <div className="w-full flex justify-start items-center mt-2">
                    <h1
                      onClick={() => handleRead(note)}
                      className="text-[10px] cursor-pointer font-medium flex items-center text-[#7b7b7b]"
                    >
                      {note.date.split("T")[0]}
                    </h1>
                  </div>
                  {deleteBar && cardID === note._id && <Delete />}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
