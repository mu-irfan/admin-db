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

export const getProjectDetails = async (uuid: string, token: string) => {
  try {
    const response = await axios.get(`${baseURL}/project/get`, {
      params: { uuid },
      headers: { Authorization: `Bearer ${token}` },
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

export const updateProject = async (data: any, token: string) => {
  try {
    const res = await axios.patch(
      `${baseURL}/project/update?uuid=${data.uuid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (uuid: string, token: string) => {
  try {
    const res = await axios.delete(`${baseURL}/project/delete?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        contract_id: uuid,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const approveProject = async (uuid: string, token: any) => {
  try {
    const res = await axios.patch(
      `${baseURL}/project/approve?uuid=${uuid}`,
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

export const rejectProject = async (uuid: string, token: any) => {
  try {
    const res = await axios.patch(
      `${baseURL}/project/reject?uuid=${uuid}`,
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
