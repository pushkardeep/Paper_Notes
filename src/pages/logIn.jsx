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
      <div className="min-h-[100vh] w-full relative flex justify-center items-center py-4 px-5">
        {/* singn in card  */}
        <div className="w-full min-[345px]:w-[300px] h-fit overflow-hidden border border-[#3f3f3f] bg-[#272727] rounded-xl py-5 px-3">
          <h1 className="w-full text-center font-medium text-xl text-white">
            Welcome Back
          </h1>
          <h1 className="w-full text-center text-[#9a9a9a] text-[13px]">
            To Page
          </h1>

          {/* form  */}
          <div className="w-full mt-4">
            <form
              onSubmit={handleSubmit}
              className="w-full h-fit flex justify-center items-center gap-2 flex-col px-5"
            >
              <input
                className="w-full py-2 px-4 rounded-full bg-transparent border border-[#8d8d8d] text-white font-medium text-[14px]"
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="w-full py-2 px-4 rounded-full bg-transparent border border-[#8d8d8d] text-white font-medium text-[14px]"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="bg-[#707070] px-4 py-1.5 font-medium text-[13px] text-white rounded-full">
                Log In
              </button>
            </form>
          </div>
          {/* redirects to signUp  */}
          <div className="flex justify-center items-center gap-2 mt-3">
            <h1 className="text-white text-[12.5px]">Create Account</h1>
            <Link
              to="/sign_up"
              className="bg-[#707070] px-3 py-1 font-medium text-[13px] text-white rounded-full"
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
