import axios from "axios";
import { baseURL } from "./auth";

export const getAllApplications = async (token: string, pending: string) => {
  try {
    const res = await axios.get(
      `${baseURL}/applications/all?status=${pending}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getApplicationDetails = async (uuid: string, token: string) => {
  try {
    const response = await axios.get(`${baseURL}/applications/detail`, {
      params: { uuid },
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.data) {
      return response.data;
    } else {
      console.log("No data found for the project details");
      return {};
    }
  } catch (error) {
    console.error("Error fetching project details:", error);
    return error;
  }
};

export const approveApplication = async (uuid: string, token: any) => {
  try {
    const res = await axios.patch(
      `${baseURL}/applications/approve?uuid=${uuid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error;
  }
};

export const rejectApplication = async (uuid: string, token: any) => {
  try {
    const res = await axios.patch(
      `${baseURL}/applications/reject?uuid=${uuid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error;
  }
};
