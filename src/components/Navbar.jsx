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
    await searchNote(search, dispatch, token);
    navigate(`/notes?search=${search}`);
  };

  useEffect(() => {
    !searchQuery
      ? getNotes(dispatch, token)
      : searchNote(searchQuery, dispatch, token);
  }, [searchQuery]);

  return (
    <>
      <div className="w-full h-fit relative flex items-center justify-between">
        <img
          className="w-[80px] sm:w-[100px] aspect-square object-cover"
          src="src/assets/Logo.png"
          alt="Logo"
        />

        <div className="w-[60%] h-fit overflow-hidden relative gap-3 sm:gap-0 flex justify-between items-center min-[270px]:w-[200px] sm:w-[300px]">
          <form
            onSubmit={handleSubmit}
            className="w-[80%] relative h-fit overflow-hidden"
          >
            <input
              type="text"
              name="Search"
              className="border bg-transparent focus:outline-none border-[#b5b5b5] focus:border-[#ffffff] hover:border-[#ffffff] rounded-full w-full text-white placeholder:text-white text-[12px] font-medium py-2 px-4"
              placeholder="Search pages"
              value={searchQuery ? searchQuery : search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="h-[90%] absolute translate-x-[-98%] left-[98%] sm:left-[99%] sm:translate-x-[-99%] top-[50%] translate-y-[-50%] flex justify-center items-center aspect-square rounded-full bg-[#4c4c4c]">
              <span className="material-symbols-outlined scale-[.8] text-white">
                search
              </span>
            </button>
          </form>

          {/* profile icon  */}
          <img
            onClick={() => {
              setOpen((state) => !state);
            }}
            className="w-[37px] cursor-pointer h-[37px] rounded-full object-cover"
            src="src/assets/profile/profile.jpg"
            alt="Profile"
          />
        </div>

        {open && <Profilebar />}
      </div>
    </>
  );
}

export default Navbar;
