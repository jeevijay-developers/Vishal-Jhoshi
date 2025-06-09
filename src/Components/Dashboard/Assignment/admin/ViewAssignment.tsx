import { fetchAllTodos, fetchTodayTodo, getAllStudents } from '@/server/studentTodo';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye, FaSpinner } from 'react-icons/fa';

interface TodoItem {
  _id: string;
  title: string;
  status: boolean;
}

interface StudentTodoData {
  date: Date;
  studentId: string;
  todo: TodoItem[];
}

interface StudentUser {
  _id: string;
  name: string;
  mentorship: string;
  studentClass: string;
  target: string;
  role: string;
}

const ViewAssignment = () => {
  const [studentTodos, setStudentTodos] = useState<StudentTodoData[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<{
    student: StudentUser;
    todos: TodoItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const studentsPerPage = 10;
  const user = useSelector((state: any) => state.user);    
  useEffect(() => {
      if(!user._id) return;
      fetchAllData();
    }, [user])

    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch both data in parallel
        const [todosRes, studentsRes] = await Promise.all([
          fetchAllTodos(),
          getAllStudents()
        ]);

        const todoData = todosRes?.data || [];
        const studentsData = studentsRes?.users || [];
        console.log("Todo's data: ", todoData);
        console.log("Student's data: ", studentsData);
        
        
        // Get all student IDs that have todos
        const studentIdsWithTodos = new Set(todoData.map(todo => todo.studentId));

        // Filter students who:
        // 1. Have role "student"
        // 2. AND have todos in todoData
        const filteredStudents = studentsData.filter(user => 
          user.role === "student" && 
          studentIdsWithTodos.has(user._id)
        );

        setStudentTodos(todoData);
        setStudents(filteredStudents);
      } catch (error) {
        toast.error("Error in fetching data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const openStudentModal = (student: StudentUser) => {
    const studentTodoData = studentTodos.find(todo => todo.studentId === student._id);
    if (studentTodoData) {
      setSelectedStudent({
        student,
        todos: studentTodoData.todo
      });
    }
  }

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <FaSpinner className="fa-spin me-2" />
        Loading...
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Student Assignments Overview</h2>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Target</th>
              <th>Mentorship</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.studentClass}</td>
                <td>{student.target}</td>
                <td>{student.mentorship || "No mentor assigned"}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => openStudentModal(student)}
                  >
                    <FaEye className="me-1" /> View Tasks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li 
                key={index} 
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedStudent.student.name}'s Tasks</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedStudent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  {selectedStudent.todos.map((todo) => (
                    <li key={todo._id} className="list-group-item d-flex align-items-center">
                      {todo.status ? (
                        <FaCheck className="text-success me-2" />
                      ) : (
                        <FaTimes className="text-muted me-2" />
                      )}
                      {todo.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .fa-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ViewAssignment