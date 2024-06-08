import { fetch } from "../../utils/fetch";
import { endpoints } from "../apis";

const sign_up = async (formData, navigate) => {
  try {
    const response = await fetch(formData, "POST", endpoints.SIGN_UP_API);
    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate("/notes");
    } else {
      return "Email already exists! Please try a different one.";
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    return "Internal server error.";
  }
};

const log_in = async (formData, navigate) => {
  try {
    const response = await fetch(formData, "POST", endpoints.LOG_IN_API);
    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate("/notes");
    } else {
      return "Email or password is incorrect!";
    }
  } catch (error) {
    console.error("Error during log-in:", error);
    return "Internal server error.";
  }
};

export { sign_up, log_in };
