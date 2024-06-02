import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Flash(props) {
  const flashRef = useRef();

  useGSAP(() => {
    gsap.from(flashRef.current, {
      opacity: 0,
      top: "-80px",
      duration: 0.5,
    });
  }, []);

  return (
    <>
      <div
        ref={flashRef}
        className="absolute top-0 left-0 bg-[#cdcdcd] py-4 px-7 font-medium w-full text-[#000]"
      >
        <h1>{props.data}</h1>
      </div>
    </>
  );
}

export default Flash;
