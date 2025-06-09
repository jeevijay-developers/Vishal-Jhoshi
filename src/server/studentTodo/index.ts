import axios from 'axios'

// export interface todo {
//   title: string;
//   startDate: Date;
//   endDate: Date;
//   status: 'pending' | 'in-progress' | 'completed';
// }

// export interface IStudentTodo {
//   studentId: string; 
//   studentName: string;
//   heading: string;
//   todos: todo[];
//   createdBy?: string; 
//   createdAt?: Date; 
//   updatedAt?: Date; 
// }

// export const getStudentTodos = async (id:string)=>{
//     try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/get-students-todo/${id}`);
//         // console.log(response);
        
//         return response.data;
//     } catch (error: any) {
//         return error.response?.data || { message: "Something went wrong" };
//     }
// }

// export const updateSubtaskStatus = async(data: IStudentTodo) =>{
//     try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/update-subtask`);
//         return response.data;
//     } catch (error: any) {
//         return error.response?.data || { message: "Something went wrong" };
//     }
// }
type Todo = {
  title: string,
  status: boolean,
}

type taskType = {
    date: Date,
    todo: Todo[];
}

export const fetchTodayTodo = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/get-todo/${id}`);
    // console.log("During fetch:", res.data);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { message: "Error in fetch today todo controller" };
  }
};

export const updateTaskStatus = async(data: taskType, id: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/update-todo/${id}`, data);
        return res.data;
    } catch (error: any) {
        return error.res?.data || {status:500 , message: "Error in update task controller" };
    }
}

export const fetchAllTodos = async() => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/get-all-todo`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { message: "Error in fetch all todo controller" }
  }
}

export const getAllStudents = async() => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/all-students`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { message: "Error in get all stutdents controller" }
  }
}