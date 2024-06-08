import React, { useEffect, useRef, useState } from "react";
import Profilebar from "./Profilebar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userData } from "../services/operations";

function Navbar() {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("search");
    setSearch(searchQuery || "");
    userData(dispatch, navigate, token, searchQuery);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/notes?search=${search}`);
    userData(dispatch, navigate, token, search);
  };

  return (
    <div className="w-full h-fit px-8 py-4 relative sm:flex justify-between items-center">
      <img
        className="hidden sm:inline-block w-[80px] sm:w-[100px] aspect-square object-cover"
        src="/images/Logo.png"
        alt="Logo"
      />
      <div className="w-full sm:w-[500px] h-fit flex flex-col-reverse sm:flex-row justify-center items-end sm:items-center gap-1 sm:gap-6">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[85%] h-fit relative overflow-hidden"
        >
          <input
            ref={searchRef}
            type="text"
            className="w-full bg-[#1F1F1F] px-12 py-3.5 rounded-full text-[#777777] placeholder:text-[#777777] text-[14px] font-medium focus:outline-none"
            placeholder="Search Notes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            onClick={() => {
              searchRef.current.focus();
            }}
            className="absolute top-3.5 left-4 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[21px] font-medium text-[#777777]">
              search
            </span>
          </div>
        </form>
        <div className="w-full flex justify-between items-center sm:w-fit sm:flex-none">
          <span
            onClick={() => navigate("/notes")}
            className="material-symbols-outlined text-[#3D3D3D] text-[30px] sm:text-[35px] cursor-pointer sm:hidden"
          >
            home
          </span>
          <span
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            className="material-symbols-outlined text-[#3D3D3D] text-[30px] sm:text-[35px] cursor-pointer"
          >
            manage_accounts
          </span>
        </div>
      </div>
      {open && <Profilebar />}
    </div>
  );
}

export default Navbar;
