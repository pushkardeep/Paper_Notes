import React, { useRef, useState } from "react";
import gsap from "gsap";
import { createNotes } from "../services/operations";
import { useDispatch } from "react-redux";
import { toogleCreateWindow } from "../Redux/slices/userInterface";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

function createWindow() {
  const currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  const date = `${day}-${month}-${year}`;

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
      left: "100%",
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(createRef.current, {
      left: "100%",
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
        className="w-full h-[100vh] absolute top-0 left-0 flex flex-col items-center justify-center z-50 bg-[#070707b9] backdrop-blur-md"
      >
        <form
          onSubmit={handleSubmit}
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
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <h1 className="w-full text-left text-[#474747] text-[12px] font-medium">
            {date}
          </h1>

          <textarea
            className="w-full h-[75vh] bg-transparent text-[16px] resize-none text-[#e3e3e3] focus:outline-none placeholder:text-[#d7d7d7] mt-4"
            required
            type="text"
            name="textarea"
            placeholder="Note there"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
        </form>
      </div>
    </>
  );
}

export default createWindow;
