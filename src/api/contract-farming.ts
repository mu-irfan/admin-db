import axios from "axios";
import { baseURL } from "./auth";

export const requestFarmContract = async (
  data: FarmRequestPayload,
  token: any
) => {
  try {
    const res = await axios.post(`${baseURL}/farm/request`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error;
  }
};

export const getRequestFarmContract = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/farm/requested-contracts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getActiveLands = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/farm/active-lands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getFarmContractHistory = async (id: string, token: string) => {
  try {
    const res = await axios.get(
      `${baseURL}/farm/full-history?contractor_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getFarmContractLandDetails = async (
  farm_uid: string,
  token: string
) => {
  try {
    const res = await axios.get(
      `${baseURL}/farm/land-details?farm_uid=${farm_uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// cancel request
export const cancelContract = async (
  contractId: string,
  secondaryOwnerId: string,
  token: string
) => {
  try {
    const res = await axios.delete(
      `${baseURL}/farm/cancel-request?contractor_id=${secondaryOwnerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          contract_id: contractId,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getRejectedContracts = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/farm/rejected-lands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
