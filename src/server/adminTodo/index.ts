import axios from "axios"

interface todo{
    heading: string;
    todos: {
        title: string;
        startDate: string;
        endDate: string;
    }[];
}

export const createAdminTodo = async (data: todo) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/create-todo`, data);
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: "Something went wrong" };
    }
}
export const getAdminTodo = async (data: todo) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-todo`, data);
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: "Something went wrong" };
    }
}