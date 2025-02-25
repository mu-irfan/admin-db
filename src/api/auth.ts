import axios from "axios";

export const baseURL = "http://192.168.200.177:7011/api";

export const createAccount = async (data: createAccountPayload) => {
  try {
    const res = await axios.post(`${baseURL}/auth/signup`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const login = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/forgot`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPasswordOtpVerify = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/verify-otp`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPasswordResetPassword = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/reset`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// get  profile
export const getUserProfile = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update  profile
export const updateUserProfile = async (data: any, token: string) => {
  try {
    const res = await axios.patch(`${baseURL}/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
