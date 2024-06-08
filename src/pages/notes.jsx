import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateWindow from "../components/Create.jsx";
import Cards from "../components/Cards.jsx";
import Reader from "../components/Reader.jsx";
import Loader from "../components/Loader.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { userData } from "../services/operations/index.js";
import { toogleCreateWindow } from "../Redux/slices/userInterface.js";
import { useDispatch, useSelector } from "react-redux";

function Notes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const createOpen = useSelector((state) => state.ui.createWindowOpen);
  const readingOpen = useSelector((state) => state.ui.readingWindowOpen);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (!searchQuery) userData(dispatch, navigate, token);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <div className="relative h-[100vh] w-[100%] overflow-hidden">
        <Navbar />
        <Cards />
        {createOpen && <CreateWindow />}
        {readingOpen && <Reader />}
        {isLoading && <Loader />}
        <div
          onClick={() => dispatch(toogleCreateWindow())}
          className="sm:flex flex-col justify-center items-center absolute bottom-[10%] right-[5%] sm:gap-5 w-fit h-fit"
        >
          <span
            onClick={() => navigate("/notes")}
            className="material-symbols-outlined hidden sm:flex justify-center items-center w-fit text-[#FAA401] bg-[#fff] hover:bg-[#dedede] px-2.5 aspect-square rounded-full text-[25px] cursor-pointer"
          >
            home
          </span>
          <span className="material-symbols-outlined w-[60px] cursor-pointer aspect-square rounded-full  flex justify-center items-center  bg-[#FAA401] hover:bg-[#faa301ef]  text-[#ffffff] text-[30px] font-medium">
            add
          </span>
        </div>
      </div>
    </div>
  );
}

export default Notes;
