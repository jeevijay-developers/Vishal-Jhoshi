import axios from "axios"

interface todo{
    heading: string;
    todos: {
        title: string;
        startDate: Date;
        endDate: Date;
        status: string;
    }[];
    createdBy?: string;
}

export const createAdminTodo = async (data: todo) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/create-todo`, data);
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: "Something went wrong" };
    }
}
export const getAdminTodo = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-todos`);
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: "Something went wrong" };
    }
}

export const getStudentsList = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/get-students`);
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: "Something went wrong" };
    }
}