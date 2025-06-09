"use server";
import apiClient from "../config/axiosConfig";

import { z } from "zod";

const HomeWork = z.object({
  class: z.string().min(1, "Class is required"),
  target: z.string().min(1, "Target is required"),
  subject: z.string().min(5, "Enter a valid subject name"),
  documentLink: z.string().min(8, "Enter a valid url"),
});

export const uploadHomework = async (formData: any) => {
  console.log("formData", formData);

  try {
    // Convert FormData to plain object
    const parsedData = HomeWork.safeParse(formData);

    if (!parsedData.success) {
      const fieldErrors = parsedData.error?.errors?.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return {
        status: false,
        errors: fieldErrors,
      };
    }

    // console.log(parsedData.data);
    const response = await apiClient.post(`/api/v1/homework/add`, {
      ...formData,
      link: formData.documentLink,
    });
    return {
      message: "Homework uploaded successfully",
      data: response.data,
      errors: {},
      status: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      errors: {},
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getAllHomeworks = async () => {
  try {
    const response = await apiClient.get(`/api/v1/homework/get-all`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
export const reportMentor = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/v1/report-mentor`, data);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: "Something went wrong" };
  }
};
