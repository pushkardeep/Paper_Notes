import React, { useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { sign_up } from "../services/auth";
import { toogleLoading } from "../Redux/slices/userInterface";
import { useDispatch, useSelector } from "react-redux";
import Flash from "../components/Flash";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [flash, setFlash] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(toogleLoading(true));
    const message = await sign_up(formData, navigate);
    dispatch(toogleLoading(false));
    if (message) {
      setFlash(message);
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative z-20">
      <div className="w-[300px] h-fit relative overflow-hidden">
        <h1 className="w-full text-center font-medium text-4xl text-white">
          Create Account
        </h1>
        <h1 className="w-full text-center text-[#b5b5b5] text-[14px]">
          Welcome to Paper Notes
        </h1>
        <div className="w-full mt-6">
          <form
            onSubmit={handleSubmit}
            className="w-full h-fit flex justify-center items-center gap-2 flex-col"
          >
            <input
              id="username"
              className="w-full focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
              type="text"
              placeholder="Username"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              id="email"
              className="w-full focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              id="password"
              className="w-full focus:outline-none text-white font-normal bg-[#1f1f1fcc] backdrop-blur-sm px-8 rounded-full py-2.5 placeholder:text-[13px] placeholder:text-[#777777] placeholder:font-medium"
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button className="bg-[#FAA401] hover:bg-[#faa301ee] px-6 py-2 text-[12px] text-white rounded-full mt-1">
              Create
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center gap-4 mt-3">
          <h1 className="text-white text-[12.5px]">Already have an Account</h1>
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
  );
}

export default SignUp;
