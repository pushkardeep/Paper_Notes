import React, { useRef } from "react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { toogleEdit } from "../Redux/slices/userInterface";
import { setEditNoteData } from "../Redux/slices/notes";
import { updateNotes } from "../services/operations";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";

function Edit() {
  const token = localStorage.getItem("token");
  const editRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteData = useSelector((state) => state.notes.setEditData);

  useGSAP(() => {
    gsap.from(editRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(editRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      onComplete: () => {
        dispatch(toogleEdit());
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const result = await updateNotes(noteData, dispatch, token, navigate);
  if(result){
    onUnMount()
  }
  };

  return (
      <>
        <div
          ref={editRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vh] w-full z-20 flex justify-center items-center backdrop-blur-[8px] bg-[#2323233b] sm:px-10"
        >
          <div className="h-[90%] w-[95%] flex flex-col items-center justify-center sm:w-[800px] bg-[#0e0e0e]/75 border border-[#aeaeae] rounded-xl px-8">
            <h1 className="mx-auto w-fit h-[8%] flex items-center text-white text-[25px] font-semibold">
              Edit Note Name
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full h-[70%] flex text-white flex-col items-center justify-center gap-3 mt-3"
            >
              <input
                className="bg-transparent border-[#a2a2a2] border px-4 py-1 rounded-md w-[75%] min-[450px]:w-[250px]"
                required
                type="text"
                name="title"
                placeholder="Edit Title"
                value={noteData.title || ""}
                onChange={(e) => {
                  dispatch(setEditNoteData({ title: e.target.value }));
                }}
              />
              <textarea
                name="textarea"
                placeholder="Edit there"
                id="textarea"
                className="bg-transparent w-full h-[80%] border resize-none border-[#a2a2a2] px-5 py-3 rounded-xl text-[15px]"
                required
                value={noteData.text || ""}
                onChange={(e) => {
                  dispatch(setEditNoteData({ text: e.target.value }));
                }}
              ></textarea>
              <div className="w-full flex justify-end gap-2 items-center">
                <h1
                  onClick={onUnMount}
                  className="text-[#000000] cursor-pointer bg-white px-2 py-1 font-semibold rounded-md"
                >
                  Cancel
                </h1>
                <button
                  type="submit"
                  className="text-[#ffffff] cursor-pointer bg-green-600 px-3.5 py-1 font-semibold rounded-md"
                >
                  Save Edits
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}

export default Edit;
