import apiClient from "../config/axiosConfig";

export const getAllDpp = async () => {
  try {
    const response = await apiClient.get(`/api/v1/dpp/get-dpp`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const getDppById = async (id: any) => {
  try {
    const response = await apiClient.get(`/api/v1/dpp/get-dpp-by-id/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
