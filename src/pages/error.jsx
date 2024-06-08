import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="w-full relative h-screen flex flex-col justify-center items-center gap-4 z-50">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/log_in");
        }}
        className="text-black bg-white rounded-lg px-6 py-2 font-medium absolute top-10 right-10"
      >
        Log Out
      </button>
      <div className="w-full text-center">
        <h1 className="text-white text-2xl font-medium">
          Something went wrong!
        </h1>
        <h1 className="text-gray-400 text-sm">or some server error occurs!</h1>
      </div>
      <img className="w-48 rounded-md" src="/images/error.webp" alt="error" />
      <h1 className="text-gray-300 text-sm">
        Please try again after sometime.
      </h1>
    </div>
  );
}

export default Error;
