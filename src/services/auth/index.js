import { fetch } from "../../utils/fetch";
import { endpoints } from "../apis";

const sign_up = async (formData, navigate) => {
  try {
    const data = await fetch(formData, "POST", endpoints.SIGN_UP_API);
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/notes");
    } else {
      return "Email has already exists! Please try a different one.";
    }
  } catch (error) {
    console.log("sign_up error occurs");
    return "Internal server error";
  }
};

const log_in = async (formData, navigate) => {
  try {
    const data = await fetch(formData, "POST", endpoints.LOG_IN_API);
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/notes");
    } else {
      return "Email or password is incorrect!";
    }
  } catch (error) {
    console.log("you have logIn error");
    return "Internal server error";
  }
};

export { sign_up, log_in };
