import React from "react";

function error() {
  return (
    <>
      <div className="w-full h-[100vh] overflow-hidden flex flex-col justify-center items-center gap-4">
        <div className="w-full h-fit">
          <h1 className="text-white w-full text-center text-[25px] font-medium">
            Something went wrong !
          </h1>
          <h1 className="text-[#c9c9c9] w-full text-center text-[15px]">
            or some server occurs!
          </h1>
        </div>
        <img
          className="w-[300px] h-fit rounded-md"
          src="/images/error.webp"
          alt="error"
        />
        <h1 className="text-[#e5e5e5] text-[15px]">
          Please try again after sometime.
        </h1>
      </div>
    </>
  );
}

export default error;
