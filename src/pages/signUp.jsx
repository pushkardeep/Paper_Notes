import React, { useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { sign_up } from "../services/auth";
import { toogleLoading } from "../Redux/slices/userInterface";
import { useDispatch, useSelector } from "react-redux";
import Flash from "../components/Flash";

function signUp() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flash, setFlash] = useState(null);

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const userData = {
    name,
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(toogleLoading());
    const message = await sign_up(userData, navigate);
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
          <h1 className="w-full text-center font-medium text-4xl text-white">
            Create Account
          </h1>
          <h1 className="w-full text-center text-[#b5b5b5] text-[14px]">
            Welcome to Paper Notes
          </h1>

          {/* form  */}
          <div className="w-full mt-6">
            <form
              onSubmit={handleSubmit}
              className="w-full h-fit flex justify-center items-center gap-2 flex-col"
            >
              <input
                id="username"
                className="w-full h-fit focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
                type="text"
                placeholder="Username"
                name="username"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                id="email"
                className="w-full h-fit focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                id="password"
                className="w-full h-fit focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
                type="Password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="bg-[#FAA401] hover:bg-[#faa301ee] px-6 py-2 text-[12px] text-white rounded-full mt-1">
                Create
              </button>
            </form>
          </div>
          {/* create account  */}
          <div className="flex justify-center items-center gap-4 mt-3">
            <h1 className="text-white text-[12.5px]">
              Already have an Account
            </h1>
            <Link
              to="/log_in"
              className="bg-[#FAA401] hover:bg-[#faa301ee] px-5 py-2 text-[10px] text-white rounded-full mt-1"
            >
              Log In
            </Link>
          </div>
        </div>

        {flash && <Flash data={flash} />}
        {isLoading && <Loader />}
      </div>
    </>
  );
}

export default signUp;
