import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateWindow from "../components/Create.jsx";
import Cards from "../components/Cards.jsx";
import Reader from "../components/Reader.jsx";
import Loader from "../components/Loader.jsx";
import { profile } from "../services/operations";
import { useNavigate } from "react-router-dom";
import { toogleCreateWindow } from "../Redux/slices/userInterface.js";
import { useDispatch, useSelector } from "react-redux";

function notes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const createOpen = useSelector((state) => state.ui.createWindowOpen);
  const readingOpen = useSelector((state) => state.ui.readingWindowOpen);
  const notes = useSelector((state) => state.notes.notes);
  const userData = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    profile(dispatch, token, navigate);
  }, []);

  return (
    <>
      <div className="relative w-full h-[100vh] overflow-hidden">
        <div className="relative h-[100vh] w-[100%] overflow-hidden">
          <Navbar />
          {notes && userData.username && userData.email ? (
            <Cards />
          ) : (
            <Loader />
          )}
          {createOpen && <CreateWindow />}
          {readingOpen && <Reader />}
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
