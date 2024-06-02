import React from "react";

function Loader() {
  return (
    <>
      <div className="h-[100vh] bg-[#0e0e0e88] z-50 backdrop-blur-sm w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-7 justify-center items-center">
        <div
          id="spinner"
          className="border-2 border-transparent border-t-2 border-t-white w-[35px] aspect-square rounded-full overflow-hidden"
        ></div>
        <h1 className="w-fit text-white">Please wait...</h1>
      </div>
    </>
  );
}

export default Loader;
