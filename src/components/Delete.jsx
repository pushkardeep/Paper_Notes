import React, { useRef } from "react";
import gsap from "gsap";
import { toogleDelete } from "../Redux/slices/userInterface";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes } from "../services/operations/index";
import { useGSAP } from "@gsap/react";

function Delete() {
  const dispatch = useDispatch();
  const deleleRef = useRef();
  const token = localStorage.getItem("token");
  const cardID = useSelector((state) => state.notes.deleteID);

  useGSAP(() => {
    gsap.from(deleleRef.current, {
      top: "-100%",
      opacity: 0,
      duration: 0.4,
    });
  });

  const onUnMount = () => {
    gsap.to(deleleRef.current, {
      top: "-100%",
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        dispatch(toogleDelete());
      },
    });
  };

  const handleClick = () => {
    deleteNotes(dispatch, token, cardID);
  };

  return (
    <>
      <div
        ref={deleleRef}
        className="absolute w-full h-[100%] px-1.5 py-2 bg-[#18181887] backdrop-blur-sm flex flex-col justify-around items-start rounded-b-lg top-0 left-0"
      >
        <div className="w-full h-fit flex justify-end px-3 cursor-pointer">
          <span
            onClick={onUnMount}
            className="material-symbols-outlined text-white"
          >
            close
          </span>
        </div>
        <div className="flex flex-col px-2 gap-1">
          <h1 className="text-[12px] text-white">Wanna Delete?</h1>
          <button
            onClick={handleClick}
            className="text-black w-fit bg-white rounded-md px-2 py-1 text-[12px] font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
