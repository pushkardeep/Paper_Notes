import React, { useRef } from "react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { toogleDelete } from "../Redux/slices/userInterface";
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
    gsap.from(deleleRef.current, { top: "-100%", duration: 0.4, opacity: 0 });
  });

  const onUnmount = () => {
    gsap.to(deleleRef.current, {
      top: "-100%",
      opacity: 0,
      duration: 0.4,
      onComplete: () => dispatch(toogleDelete()),
    });
  };

  const handleClick = () => {
    deleteNotes(dispatch, token, cardID, navigate);
  };

  return (
    <div
      ref={deleleRef}
      className="absolute top-0 left-0 w-full h-[100%] bg-[#00000085] backdrop-blur-lg flex flex-col justify-center items-center px-3.5 gap-10 border rounded-2xl border-[#383838]"
    >
      <div className="w-full h-fit flex justify-end cursor-pointer">
        <span
          onClick={onUnmount}
          className="material-symbols-outlined text-white text-[30px]"
        >
          close
        </span>
      </div>
      <div className="flex flex-col gap-1 justify-start w-full h-fit">
        <h1 className="text-[13px] text-white">Wanna Delete?</h1>
        <button
          onClick={handleClick}
          className="text-black w-fit bg-[#D9D9D9] hover:bg-[#b8b8b8] rounded-full px-5 py-2 text-[12px] font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Delete;
