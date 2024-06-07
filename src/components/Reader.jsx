import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toogleRead } from "../Redux/slices/userInterface";
import { setEditNoteData } from "../Redux/slices/notes";
import { updateNotes } from "../services/operations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ReadingWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const readerRef = useRef();
  const noteData = useSelector((state) => state.notes.setEditData);

  useGSAP(() => {
    gsap.from(readerRef.current, {
      left: "100%",
      duration: 0.4,
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(readerRef.current, {
      left: "100%",
      duration: 0.4,
      onComplete: () => {
        dispatch(toogleRead());
      },
    });
  };

  const handleSunmit = async (e) => {
    e.preventDefault();
    const result = await updateNotes(noteData, dispatch, token, navigate);
    if (result) {
      onUnMount();
    }
  };

  return (
    <>
      <>
        <div
          ref={readerRef}
          className="w-full h-[100vh] absolute top-0 left-0 flex flex-col items-center justify-center z-30 bg-[#070707b9] backdrop-blur-md"
        >
          <form
            onSubmit={handleSunmit}
            className="w-full h-full flex flex-col justify-start items-start px-16 py-8 gap-4"
          >
            <div className="w-full h-fit flex items-center justify-between text-white">
              <span
                onClick={onUnMount}
                className="material-symbols-outlined text-[40px] cursor-pointer"
              >
                undo
              </span>

              <button
                type="submit"
                className="text-[#ffffff] cursor-pointer bg-[#FAA401] px-4 py-1.5 font-semibold rounded-lg"
              >
                Save
              </button>
            </div>

            <input
              className="w-fit bg-transparent text-[28px] font-medium text-[#e3e3e3] focus:outline-none placeholder:text-[#4B4B4B] mt-4"
              required
              type="text"
              name="Title"
              placeholder="Edit Title"
              value={noteData.title}
              onChange={(e) => {
                dispatch(setEditNoteData({ title: e.target.value }));
              }}
            />

            <h1 className="w-full text-left text-[#474747] text-[12px] font-medium">
              {noteData.date.split("T")[0]}
            </h1>

            <textarea
              className="w-full h-[75vh] bg-transparent text-[16px] resize-none text-[#e3e3e3] focus:outline-none placeholder:text-[#d7d7d7] mt-4"
              required
              type="text"
              name="textarea"
              placeholder="Edit Note"
              value={noteData.text}
              onChange={(e) => {
                dispatch(setEditNoteData({ text: e.target.value }));
              }}
            ></textarea>
          </form>
        </div>
      </>
    </>
  );
}

export default ReadingWindow;
