import React, { useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { log_in } from "../services/auth";
import { toogleLoading } from "../Redux/slices/userInterface";
import { useDispatch, useSelector } from "react-redux";
import Flash from "../components/Flash";

function logIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flash, setFlash] = useState(null);

  const userData = {
    email,
    password,
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(toogleLoading());
    const message = await log_in(userData, navigate);
    if (message) {
      dispatch(toogleLoading());
      setFlash(message);
    } else {
      dispatch(toogleLoading());
      resetForm();
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center relative z-20">
        {/* singn in card  */}
        <div className="w-[300px] h-fit relative overflow-hidden">
          <h1 className="ww-full text-center font-medium text-3xl text-white">
            Welcome Back
          </h1>
          <h1 className="w-full text-center text-[#b5b5b5] text-[14px]">
            To Page
          </h1>

          {/* form  */}
          <div className="w-full mt-6">
            <form
              onSubmit={handleSubmit}
              className="w-full h-fit flex justify-center items-center gap-2 flex-col"
            >
              <input
                className="w-full h-fit focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="w-full h-fit focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="bg-[#FAA401] hover:bg-[#faa301ee] px-6 py-2 text-[12px] text-white rounded-full mt-1">
                Log In
              </button>
            </form>
          </div>
          {/* redirects to signUp  */}
          <div className="flex justify-center items-center gap-4 mt-3">
            <h1 className="text-white text-[12.5px]">Create Account</h1>
            <Link
              to="/sign_up"
              className="bg-[#FAA401] hover:bg-[#faa301ee] px-5 py-2 text-[10px] text-white rounded-full mt-1"
            >
              Create
            </Link>
          </div>
        </div>
        {flash && <Flash data={flash} />}
        {isLoading && <Loader />}
      </div>
    </>
  );
}

export default logIn;
