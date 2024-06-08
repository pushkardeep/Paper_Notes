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
      <div className="absolute right-5 top-12 sm:top-24 z-20 bg-[#32323287] rounded-xl py-3 px-4 flex flex-col justify-center items-start backdrop-blur-md w-[220px]">
        <h1 className="w-fit text-start text-white font-medium text-[24px] whitespace-nowrap">
          {data.username}
        </h1>
        <h1 className="w-fit text-start text-[#C7C7C7] font-normal text-[13px] whitespace-nowrap">
          {data.email}
        </h1>

        {/* logout  */}
        <h1
          className="bg-[#D9D9D9] text-[#000] px-5 h-fit w-fit py-2 rounded-full text-[11px] font-semibold cursor-pointer mt-4 hover:bg-[#cbcbcb]"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(removeUser());
            navigate("/log_in");
          }}
        >
          Log Out
        </h1>
      </div>
    </>
  );
}

export default Profilebar;
