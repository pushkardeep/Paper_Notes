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
      <div className="relative w-full h-fit overflow-hidden">
        <div className="relative h-[100vh] w-[100%] overflow-hidden">
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
            className="w-[60px] cursor-pointer aspect-square rounded-full bg-[#FAA401] flex justify-center items-center absolute bottom-[5%] right-[5%]"
          >
            <span className="material-symbols-outlined text-[#ffffff] text-[30px] font-medium">
              add
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default notes;
