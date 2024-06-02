import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { toogleRead } from "../Redux/slices/userInterface";

function ReadingWindow() {
  const dispatch = useDispatch();
  const readerRef = useRef();
  const noteData = useSelector((state) => state.notes.readingData);

  useGSAP(() => {
    gsap.from(readerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(readerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        dispatch(toogleRead());
      },
    });
  };

  return (
    <>
      <div
        ref={readerRef}
        className="absolute w-[100%] h-[100vh] top-0 left-0 bg-[#1c1c1cbe] text-white z-10 backdrop-blur-[8px] px-10 py-6"
      >
        <div className="w-full h-fit text-[13px] text-right">
          {noteData.date.split("T")[0]}
        </div>
        <div className="w-full h-fit text-[25px] font-medium text-center mt-8">
          {noteData.title}
        </div>

        <div className="w-full sm:w-[600px] md:w-[700px] text-left mt-5 text-[15px] max-h-[60vh] overflow-y-auto mx-auto">
          {noteData.text}
        </div>

        <div
          onClick={onUnMount}
          className="w-[45px] z-10 cursor-pointer aspect-square rounded-full bg-[#fff] hover:bg-[#bebebe] flex justify-center items-center absolute bottom-[5%] right-[5%]"
        >
          <span className="material-symbols-outlined text-[#1f1f1f] text-[30px] font-bold">
            close
          </span>
        </div>
      </div>
    </>
  );
}

export default ReadingWindow;
