import React, { useState, useEffect } from 'react'
import { FaClipboardList, FaCalendarAlt, FaUser, FaClock, FaCheckCircle, FaSpinner, FaExclamationCircle, FaChevronDown, FaChevronUp, FaEye, FaUsers } from 'react-icons/fa'
import { getAdminTodo, getStudentsList } from '@/server/adminTodo'

interface Todo {
  title: string
  startDate: string
  endDate: string
  status: 'pending' | 'in-progress' | 'completed'
}

interface StudentProgress {
  studentId: string
  studentName: string
  completedTodos: number
  totalTodos: number
  completionPercentage: number
  todoStatuses: {
    title: string
    status: 'pending' | 'in-progress' | 'completed'
    startDate: string
    endDate: string
  }[]
}

interface Assignment {
  _id: string
  heading: string
  todos: Todo[]
  createdBy: string
  createdAt: string
  updatedAt: string
  studentProgress: StudentProgress[]
}

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedAssignments, setExpandedAssignments] = useState<Set<string>>(new Set())
  const [selectedStudent, setSelectedStudent] = useState<{ assignmentId: string, student: StudentProgress } | null>(null)

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      setLoading(true)

      const response = await getAdminTodo();
      
      // Process each assignment with student progress
      const transformedData = await Promise.all(
        response.map(async (assignment: Assignment) => ({
          ...assignment,
          studentProgress: await generateMockStudentProgress(assignment.todos)
        }))
      );

      setAssignments(transformedData)
    } catch (err) {
      setError('Failed to fetch assignments')
      console.error('Error fetching assignments:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fixed function to handle async getStudentsList
  const generateMockStudentProgress = async (todos: Todo[]): Promise<StudentProgress[]> => {
    try {
      const students = await getStudentsList();
      console.log(students);      
      return students.map((student: any) => {
        const todoStatuses = todos.map(todo => ({
          title: todo.title,
          status: ['pending', 'in-progress', 'completed'][Math.floor(Math.random() * 3)] as 'pending' | 'in-progress' | 'completed',
          startDate: todo.startDate,
          endDate: todo.endDate
        }))

        const completedTodos = todoStatuses.filter(t => t.status === 'completed').length
        const totalTodos = todoStatuses.length
        const completionPercentage = Math.round((completedTodos / totalTodos) * 100)

        return {
          studentId: student.studentId,
          studentName: student.studentName,
          completedTodos,
          totalTodos,
          completionPercentage,
          todoStatuses
        }
      })
    } catch (error) {
      console.error('Error fetching students list:', error)
      return [] // Return empty array if students fetch fails
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        class: 'bg-warning text-dark border',
        icon: <FaExclamationCircle className="me-1" />,
        text: 'Pending',
        style: {}
      },
      'in-progress': {
        class: 'bg-info text-white border-0',
        icon: <FaSpinner className="me-1" />,
        text: 'In Progress',
        style: { backgroundColor: '#308e87' }
      },
      completed: {
        class: 'bg-success text-white border-0',
        icon: <FaCheckCircle className="me-1" />,
        text: 'Completed',
        style: {}
      }
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <span
        className={`badge ${config.class} px-2 py-1 rounded-pill`}
        style={config.style}
      >
        {config.icon}
        {config.text}
      </span>
    )
  }

  const toggleAssignmentExpansion = (assignmentId: string) => {
    const newExpanded = new Set(expandedAssignments)
    if (newExpanded.has(assignmentId)) {
      newExpanded.delete(assignmentId)
    } else {
      newExpanded.add(assignmentId)
    }
    setExpandedAssignments(newExpanded)
  }

  const openStudentModal = (assignmentId: string, student: StudentProgress) => {
    setSelectedStudent({ assignmentId, student })
  }

  const closeStudentModal = () => {
    setSelectedStudent(null)
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" style={{ color: '#308e87' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading assignments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={fetchAssignments}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <style jsx>{`
        .primary-color {
          color: #308e87 !important;
        }
        
        .primary-bg {
          background-color: #308e87 !important;
        }
        
        .primary-border {
          border-color: #308e87 !important;
        }
        
        .assignment-card {
          transition: all 0.3s ease;
          border: 2px solid #f8f9fa;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .assignment-card:hover {
          border-color: #308e87;
          box-shadow: 0 4px 8px rgba(48, 142, 135, 0.15);
        }
        
        .assignment-header {
          background-color: #308e87;
          color: white;
        }
        
        .student-row:hover {
          background-color: rgba(48, 142, 135, 0.05);
        }
        
        .progress-bar-custom {
          background-color: #308e87;
        }
        
        .btn-primary-custom {
          background-color: #308e87;
          border-color: #308e87;
          color: white;
        }
        
        .btn-primary-custom:hover {
          background-color: #266b65;
          border-color: #266b65;
          color: white;
        }
        
        .btn-outline-primary-custom {
          color: #308e87;
          border-color: #308e87;
        }
        
        .btn-outline-primary-custom:hover {
          background-color: #308e87;
          border-color: #308e87;
          color: white;
        }
        
        .modal-header-custom {
          background-color: #308e87;
          color: white;
        }
        
        .table-header {
          background-color: #308e87;
          color: white;
        }
      `}</style>

      <div className="text-center mb-5">
        <h2 className="fw-bold primary-color mb-3">
          <FaClipboardList className="me-2" />
          Assignment Progress Tracker
        </h2>
        <p className="text-muted">Monitor student progress across all assignments</p>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-5">
          <FaClipboardList size={64} className="text-muted mb-3" />
          <h4 className="text-muted">No assignments found</h4>
          <p className="text-muted">Create your first assignment to get started!</p>
        </div>
      ) : (
        <div className="row">
          {assignments.map((assignment) => {
            const isExpanded = expandedAssignments.has(assignment._id)
            const averageCompletion = Math.round(
              assignment.studentProgress.reduce((sum, student) => sum + student.completionPercentage, 0) /
              assignment.studentProgress.length
            )

            return (
              <div key={assignment._id} className="col-12 mb-4">
                <div className="card assignment-card rounded-3 overflow-hidden">
                  {/* Assignment Header */}
                  <div className="assignment-header p-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h4 className="mb-2 fw-bold">{assignment.heading}</h4>
                        <div className="d-flex flex-wrap gap-3">
                          <span className="badge bg-dark text-dark px-3 py-2 rounded-pill">
                            <FaUser className="me-1" />
                            {assignment.createdBy}
                          </span>
                          <span className="badge bg-dark text-dark px-3 py-2 rounded-pill">
                            <FaCalendarAlt className="me-1" />
                            {formatDate(assignment.createdAt)}
                          </span>
                          <span className="badge bg-dark text-dark px-3 py-2 rounded-pill">
                            <FaClock className="me-1" />
                            {assignment.todos.length} Tasks
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <div className="bg-white text-dark rounded-3 p-3 text-center">
                          <h5 className="mb-1 primary-color">{averageCompletion}%</h5>
                          <small>Average Completion</small>
                          <div className="progress mt-2" style={{ height: '8px' }}>
                            <div
                              className="progress-bar progress-bar-custom"
                              style={{ width: `${averageCompletion}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Body */}
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="primary-color mb-0">
                        <FaUsers className="me-2" />
                        Student Progress ({assignment.studentProgress.length} students)
                      </h5>
                      <button
                        className="btn btn-outline-primary-custom"
                        onClick={() => toggleAssignmentExpansion(assignment._id)}
                      >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        {isExpanded ? ' Hide Students' : ' Show Students'}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead>
                            <tr className="table-header">
                              <th>Student Name</th>
                              <th>Progress</th>
                              <th>Completed Tasks</th>
                              <th>Completion %</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assignment.studentProgress.map((student, index) => (
                              <tr key={student.studentId} className="student-row">
                                <td>
                                  <div className="fw-semibold">Name: {student.studentName}</div>
                                  <small className="text-muted">ID: {student.studentId}</small>
                                </td>
                                <td>
                                  <div className="progress" style={{ height: '20px', width: '150px' }}>
                                    <div
                                      className="progress-bar progress-bar-custom"
                                      style={{ width: `${student.completionPercentage}%` }}
                                    >
                                      {student.completionPercentage}%
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="fw-bold primary-color">
                                    {student.completedTodos}
                                  </span>
                                  <span className="text-muted">
                                    /{student.totalTodos}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`badge px-3 py-2 rounded-pill ${student.completionPercentage === 100
                                        ? 'bg-success text-white'
                                        : student.completionPercentage >= 50 || student.completionPercentage > 100
                                          ? 'bg-info text-white' 
                                          : student.completionPercentage < 50 
                                          ? 'bg-warning text-dark'
                                          : 'bg-light text-dark border'
                                      }`}
                                  >
                                    {student.completionPercentage}%
                                  </span>

                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary-custom btn-sm"
                                    onClick={() => openStudentModal(assignment._id, student)}
                                  >
                                    <FaEye className="me-1" />
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header modal-header-custom">
                <h5 className="modal-title">
                  <FaUser className="me-2" />
                  {selectedStudent.student.studentName} - Task Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeStudentModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-4 text-center">
                    <div className="border rounded-3 p-3">
                      <h4 className="primary-color mb-1">{selectedStudent.student.completedTodos}</h4>
                      <small className="text-muted">Completed Tasks</small>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="border rounded-3 p-3">
                      <h4 className="primary-color mb-1">{selectedStudent.student.totalTodos}</h4>
                      <small className="text-muted">Total Tasks</small>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="border rounded-3 p-3">
                      <h4 className="primary-color mb-1">{selectedStudent.student.completionPercentage}%</h4>
                      <small className="text-muted">Completion Rate</small>
                    </div>
                  </div>
                </div>

                <h6 className="primary-color mb-3">Task Breakdown:</h6>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-header">
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudent.student.todoStatuses.map((todo, index) => (
                        <tr key={index}>
                          <td className="fw-bold text-muted">{index + 1}</td>
                          <td className="fw-semibold">{todo.title}</td>
                          <td>{formatDate(todo.startDate)}</td>
                          <td>{formatDate(todo.endDate)}</td>
                          <td className={`${todo.status === 'pending'? 'text-black': 'text-white'}`}>{getStatusBadge(todo.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary-custom"
                  onClick={closeStudentModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewAssignment