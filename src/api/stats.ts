import axios from "axios";
import { baseURL } from "./auth";

export const studentStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/student/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const adminStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const projectStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/project/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const applicationStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/applications/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
