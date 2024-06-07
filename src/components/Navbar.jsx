import React, { useEffect, useState } from "react";
import Profilebar from "./Profilebar";
import { getNotes, searchNote } from "../services/operations";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchNote(search, dispatch, token, navigate);
    navigate(`/notes?search=${search}`);
  };

  useEffect(() => {
    !searchQuery
      ? getNotes(dispatch, token, navigate)
      : searchNote(searchQuery, dispatch, token);
  }, [searchQuery]);

  return (
    <>
      <div className="w-full h-fit px-8 py-4 relative sm:flex justify-between items-center">
        {/* logo  */}
        <img
          className="hidden sm:inline-block w-[80px] sm:w-[100px] aspect-square object-cover"
          src="/images/Logo.png"
          alt="Logo"
        />

        <div className="w-full h-fit flex flex-col-reverse justify-center items-end gap-1 sm:flex-row sm:items-center sm:gap-6 sm:w-[500px]">
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[85%] h-fit relative overflow-hidden"
          >
            <input
              type="text"
              name="Search"
              className="w-full h-fit bg-[#1F1F1F] px-12 py-3.5 rounded-full text-[#777777] placeholder:text-[#777777] text-[14px] font-medium focus:outline-none"
              placeholder="Search Notes"
              value={searchQuery ? searchQuery : search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="absolute top-3.5 left-4">
              <span className="material-symbols-outlined text-[21px] font-medium text-[#777777]">
                search
              </span>
            </button>
          </form>

          {/* profile bar  */}

          <span
            onClick={() => {
              setOpen((state) => !state);
            }}
            class="material-symbols-outlined text-[#3D3D3D] text-[30px] sm:text-[35px] w-fit h-fit cursor-pointer"
          >
            manage_accounts
          </span>
        </div>

        {open && <Profilebar />}
      </div>
    </>
  );
}

export default Navbar;
