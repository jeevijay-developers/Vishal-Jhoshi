'use client'
import { fetchTodayTodo, updateTaskStatus } from '@/server/studentTodo'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaClipboardCheck, FaSpinner, FaToggleOn, FaToggleOff, FaTasks } from 'react-icons/fa'

interface Todo {
  _id?: string
  title: string;
  status: boolean;
}

interface StudentTodo {
  _id: string;
  date: Date;
  todo: Todo[];
}

const StudentAssignment = () => {
  const user = useSelector((state: any) => state.user);
  const [assignments, setAssignments] = useState<StudentTodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localTodos, setLocalTodos] = useState<{[key: string]: boolean}>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    if(!user._id) return
    fetchAssignments()
  }, [user])

const fetchAssignments = async () => {
  try {
    setLoading(true)
    const res = await fetchTodayTodo(user._id)
    // console.log("Data: ", res)

    setAssignments([res.data]);

    // Initialize local state
    const initialTodos: { [key: string]: boolean } = {}
    if (res.data && res.data.todo) {
      res.data.todo.forEach((todo: Todo) => {
        initialTodos[todo.title] = todo.status
      })
    }
    setLocalTodos(initialTodos);
    setLoading(false);
  } catch (error) {
    toast.error("Error in fetching assignments")
  } finally {
    setLoading(false)
  }
}

  const handleToggle = (title: string) => {
    setLocalTodos(prev => {
      const newState = {
        ...prev,
        [title]: !prev[title]
      }
      setHasChanges(true)
      return newState
    })
  }

const handleSubmit = async () => {
    if (!hasChanges || !assignments[0]?._id) return;
    
    try {
      setSaving(true)      
      const updatedTodos = assignments[0].todo.map(todo => ({
        title: todo.title,
        status: Boolean(localTodos[todo.title]) // Convert to Boolean object
      }))

      const res = await updateTaskStatus({ todo: updatedTodos, date: assignments[0].date }, assignments[0]._id);
      
      if(res.status !== 500) {
        toast.success("Progress updated successfully!");
      } else {
        toast.error("Error in updating assignments");
      }
      setHasChanges(false)
    } catch (error) {
      toast.error("Failed to update progress")
    } finally {
      setSaving(false)
    }
  }

  const calculateProgress = () => {
    if (!assignments[0]?.todo) return 0
    const completed = assignments[0].todo.filter(todo => localTodos[todo.title]).length
    return Math.round((completed / assignments[0].todo.length) * 100)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <FaSpinner className="fa-spin me-2" />
        Loading your tasks...
      </div>
    )
  }

  return (
    <div className="container py-5">


      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: '#308e87' }}>
          <FaClipboardCheck className="me-2" />
          Daily Tasks
        </h2>
        {assignments[0]?.todo && (
          <div className="text-muted">
            <FaTasks className="me-2" />
            {calculateProgress()}% Complete
          </div>
        )}
      </div>

      {assignments[0]?.todo && assignments[0].todo.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="task-card p-4">
              <div className="progress mb-4" style={{ height: '10px' }}>
                <div 
                  className="progress-bar" 
                  style={{ width: `${calculateProgress()}%` }}
                  role="progressbar"
                  aria-valuenow={calculateProgress()}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              
              <div className="list-group">
                {assignments[0].todo.map((task, index) => (
                  <div 
                    key={task._id || index}
                    className="list-group-item d-flex justify-content-between align-items-center border-0 py-3"
                  >
                    <span className={localTodos[task.title] ? 'text-decoration-line-through' : ''}>
                      {task.title}
                    </span>
                    <button
                      className="toggle-button"
                      onClick={() => handleToggle(task.title)}
                      aria-label={localTodos[task.title] ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {localTodos[task.title] ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button
                  className="submit-button text-white"
                  onClick={handleSubmit}
                  disabled={!hasChanges || saving}
                >
                  {saving ? (
                    <>
                      <FaSpinner className="fa-spin me-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Progress'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          <FaTasks size={48} className="mb-3" />
          <h4>No tasks available</h4>
          <p>You don't have any tasks assigned for today.</p>
        </div>
      )}

      <style jsx>{`
        .task-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .toggle-button {
          background: none;
          border: none;
          color: #308e87;
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .toggle-button:hover {
          color: #266b65;
        }
        
        .progress-bar {
          background-color: #308e87;
          height: 10px;
          border-radius: 5px;
          transition: width 0.5s ease-in-out;
        }
        
        .submit-button {
          background-color: #308e87;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          transition: all 0.3s ease;
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: #266b65;
          transform: translateY(-1px);
        }
        
        .submit-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

export default StudentAssignment