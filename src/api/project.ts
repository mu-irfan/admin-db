import axios from "axios";
import { baseURL } from "./auth";

export const createProject = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseURL}/project/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProjectList = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/project/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
