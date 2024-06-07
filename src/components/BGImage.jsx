import React from "react";

function BGImage() {
  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <img
          id="BGImage"
          className="w-[100px] h-fit object-cover"
          src="/images/Logo.png"
          alt="Logo"
        />
      </div>
    </>
  );
}

export default BGImage;
