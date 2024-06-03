import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateWindow from "../components/Create.jsx";
import Cards from "../components/Cards.jsx";
import Edit from "../components/Edit.jsx";
import Reader from "../components/Reader.jsx";
import Loader from "../components/Loader.jsx";
import { toogleCreateWindow } from "../Redux/slices/userInterface.js";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../services/operations";
import { useNavigate } from "react-router-dom";

function notes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = window.innerHeight;
  const token = localStorage.getItem("token");
  const createOpen = useSelector((state) => state.ui.createWindowOpen);
  const editOpen = useSelector((state) => state.ui.editWindowOpen);
  const readingOpen = useSelector((state) => state.ui.readingWindowOpen);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    profile(dispatch, token, navigate);
  }, []);

  return (
    <>
      <div
        className={`relative h-[${JSON.stringify(
          width
        )}px] border-2 w-[100%] px-5 py-2 overflow-hidden`}
      >
        <Navbar />
        {notes ? <Cards /> : <Loader />}
        {createOpen && <CreateWindow />}
        {readingOpen && <Reader />}
        {editOpen && <Edit />}
        {isLoading && <Loader />}
        <div
          onClick={() => {
            dispatch(toogleCreateWindow());
          }}
          className="w-[45px] cursor-pointer aspect-square rounded-full bg-[#fff] hover:bg-[#cfcfcf] flex justify-center items-center absolute bottom-[5%] right-[5%]"
        >
          <span className="material-symbols-outlined text-[#1f1f1f] text-[30px] font-semibold">
            add
          </span>
        </div>
      </div>
    </>
  );
}

export default notes;
