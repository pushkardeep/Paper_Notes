import React, { useRef } from "react";
import gsap from "gsap";
import { toogleDelete } from "../Redux/slices/userInterface";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes } from "../services/operations/index";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

function Delete() {
  const dispatch = useDispatch();
  const deleleRef = useRef();
  const navigate = useNavigate();
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
    deleteNotes(dispatch, token, cardID, navigate);
  };

  return (
    <>
      <div
        ref={deleleRef}
        className="absolute w-full h-[100%] px-1.5 py-2 bg-[#18181887] backdrop-blur-sm flex flex-col justify-center items-center gap-5 rounded-b-lg top-0 left-0"
      >
        <div className="w-full h-fit flex justify-end px-3 cursor-pointer">
          <span
            onClick={onUnMount}
            className="material-symbols-outlined text-white text-[26px]"
          >
            close
          </span>
        </div>
        <div className="flex flex-col px-2 gap-1 justify-start w-full h-fit">
          <h1 className="text-[13px] text-white">Wanna Delete?</h1>
          <button
            onClick={handleClick}
            className="text-black w-fit bg-white rounded-lg px-3 py-1.5 text-[12px] font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
