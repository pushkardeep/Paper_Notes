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
      <div className="min-h-[100vh] w-full relative flex justify-center items-center py-4 px-5">
        {/* singn in card  */}
        <div className="w-full min-[345px]:w-[300px] h-fit overflow-hidden border border-[#3f3f3f] bg-[#272727] rounded-xl py-5 px-3">
          <h1 className="w-full text-center font-medium text-xl text-white">
            Create Account
          </h1>
          <h1 className="w-full text-center text-[#9a9a9a] text-[13px]">
            Welcom in Page
          </h1>

          {/* form  */}
          <div className="w-full mt-4">
            <form
              onSubmit={handleSubmit}
              className="w-full h-fit flex justify-center items-center gap-2 flex-col px-5"
            >
              <input
                id="username"
                className="w-full py-2 px-4 rounded-full bg-transparent border border-[#8d8d8d] text-white font-medium text-[14px]"
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
                className="w-full py-2 px-4 rounded-full bg-transparent border border-[#8d8d8d] text-white font-medium text-[14px]"
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
                className="w-full py-2 px-4 rounded-full bg-transparent border border-[#8d8d8d] text-white font-medium text-[14px]"
                type="Password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="bg-[#707070] px-4 py-1.5 font-medium text-[13px] text-white rounded-full">
                Create
              </button>
            </form>
          </div>
          {/* create account  */}
          <div className="flex justify-center items-center gap-2 mt-3">
            <h1 className="text-white text-[12.5px]">
              Already have an Account
            </h1>
            <Link
              to="/log_in"
              className="bg-[#707070] px-3 py-1 font-medium text-[13px] text-white rounded-full"
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
