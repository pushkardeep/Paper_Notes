import React, { useRef, useState } from "react";
import gsap from "gsap";
import { createNotes } from "../services/operations";
import { useDispatch } from "react-redux";
import { toogleCreateWindow } from "../Redux/slices/userInterface";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

function createWindow() {
  const createRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const noteData = {
    title,
    text,
  };

  useGSAP(() => {
    gsap.from(createRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(createRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      onComplete: () => {
        dispatch(toogleCreateWindow());
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createNotes(noteData, dispatch, token, navigate);
    if (result) {
      onUnMount();
    }
  };

  return (
      <>
        <div
          ref={createRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vh] w-full z-20 flex justify-center items-center backdrop-blur-[8px] bg-[#2323233b] sm:px-10"
        >
          <div className="h-[90%] w-[95%] flex flex-col items-center justify-center sm:w-[800px] bg-[#0e0e0e]/75 border border-[#aeaeae] rounded-xl px-8">
            <h1 className="mx-auto w-fit h-[8%] flex items-center text-white text-[25px] font-semibold">
              Add a Note
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full h-[70%] flex flex-col items-center justify-center gap-3 mt-3"
            >
              <input
                className="bg-transparent border-[#a2a2a2] border px-4 py-1 rounded-md w-[75%] min-[450px]:w-[250px] text-white"
                required
                type="text"
                name="title"
                placeholder="Add Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                className="bg-transparent text-white w-full h-[80%] border resize-none border-[#a2a2a2] px-5 py-3 rounded-xl text-[14px] font-medium"
                required
                type="text"
                name="textarea"
                placeholder="Note there"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
}

export default createWindow;
