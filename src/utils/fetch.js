import axios from "axios";

const axiosInstance = axios.create({});
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetch = async (formData, method, endpoint, token) => {
  try {
    const data = await axiosInstance({
      baseURL: BASE_URL,
      url: endpoint,
      method: method,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("you have axios error");
  }
};
