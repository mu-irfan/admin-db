import apiClient from "@/lib/axios";
import { createQueryString } from "@/lib/helpers";
import axios from "axios";
import { baseURL } from "./auth";

export const getLands = async (
  category: string,
  value: string,
  token: string
) => {
  try {
    const response = await axios.get(
      `${baseURL}/farm/filter_farm_data_updated`,
      {
        params: {
          [category]: value,
        },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data?.data?.length > 0) {
      return response.data.data;
    } else {
      console.log("No data found for the query");
      return [];
    }
  } catch (error) {
    console.error("Error fetching farm data:", error);
    return error;
  }
};

export const getLandDetails = async (farm_uid: any, token: string) => {
  try {
    const response = await apiClient.get(`/farm_details_updated`, {
      params: { farm_uid },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      return response.data;
    } else {
      console.log("No data found for the land details");
      return {};
    }
  } catch (error) {
    console.error("Error fetching land details:", error);
    return error;
  }
};

export const getFilteredLands = async (filters: any, token: string) => {
  try {
    const queryString = createQueryString(filters);
    const response = await apiClient.get(
      `/filter_farm_data_updated?${queryString}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data?.data?.length > 0) {
      return response.data.data;
    } else {
      console.log("No data found for the query");
      return [];
    }
  } catch (error) {
    console.error("Error fetching farm data:", error);
    throw error;
  }
};
