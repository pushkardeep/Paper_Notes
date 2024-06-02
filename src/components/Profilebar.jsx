import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../Redux/slices/user";

function Profilebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  return (
    <>
      <div
        className={`absolute py-2 px-2 overflow-hidden w-[135px] h-fit rounded-xl border border-[#616161] bg-[#2d2d2d]/50 backdrop-blur-sm top-[100%] right-[0] z-10`}
      >
        <h1 className="w-full text-start text-white font-medium text-[15px]">
          {data.username}
        </h1>
        <h1 className="w-full text-start text-[#d2d2d2] font-normal text-[11px] line-clamp-1">
          {data.email}
        </h1>

        <div
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(removeUser());
            navigate("/log_in");
          }}
          className="flex mt-5 w-fit cursor-pointer justify-start items-center gap-[2px] font-semibold text-[13px] text-black bg-white px-2 py-1 rounded-md"
        >
          <h1>Logout</h1>
          <span className="material-symbols-outlined font-medium scale-[.8]">
            logout
          </span>
        </div>
      </div>
    </>
  );
}

export default Profilebar;
