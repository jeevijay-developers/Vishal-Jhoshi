import { createAdminTodo } from "@/server/adminTodo";
import React, { useState } from "react";
import { FaPlus, FaTrashAlt, FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";

interface Todo {
  title: string;
  startDate: string;
  endDate: string;
}

const CreateAssignment: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    title: "",
    startDate: "",
    endDate: "",
  });

  const [heading, setHeading] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "heading") {
      setHeading(value);
    } else {
      setNewTodo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTodo = () => {
    if (!newTodo.title || !newTodo.startDate || !newTodo.endDate) {
      alert("Please fill all fields");
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo({ title: "", startDate: "", endDate: "" });
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleSubmit = async () => {
    const obj = {
      heading: heading,
      todos: todos
    }
    if (!obj.heading || obj.todos.length === 0) {
      toast.error("Please fill the heading and add at least one todo");
      return;
    }
    if (todos.some(todo => !todo.title || !todo.startDate || !todo.endDate)) {
      toast.error("Please fill all fields for each todo");
      return;
    }
    try {
      const response = await createAdminTodo(obj);
      if (response.error) {
        toast.error(response.error);
        return;
      }
      console.log("Todos submitted successfully:", obj);
      setTodos([]);
      setHeading("");
      toast.success("Todos submitted successfully!");
    } catch (error) {
      console.error("Error submitting todos:", error);
      toast.error("Failed to submit todos. Please try again.");
      return;
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          <FaClipboardList className="me-2" />
          Create Assignments
        </h2>
        <p className="text-muted">Plan your tasks with start and end dates</p>
      </div>

      {/* Heading Input */}
      <div className="text-center align-items-center justify-content-center mb-4">
        <div className="col-md-4 mx-auto">
          <label className="form-label fw-semibold">Todo Heading</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter todo heading"
            name="heading"
            value={heading}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* New Todo Form */}
      <div className="card shadow p-4 mb-4 border-0 rounded-4">
        <div className="row gy-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Todo Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title"
              name="title"
              value={newTodo.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={newTodo.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={newTodo.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-outline-primary" onClick={addTodo}>
              <FaPlus /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      {todos.length > 0 && (
        <div className="card shadow-sm mb-4 border-0 rounded-4">
          <div className="card-body">
            {heading && (
              <h4 className="text-center text-success mb-3">{heading}</h4>
            )}
            <h5 className="card-title text-primary mb-3">Todo List</h5>
            <ul className="list-group list-group-flush">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">{todo.title}</h6>
                    <small className="text-muted">
                      {todo.startDate} → {todo.endDate}
                    </small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTodo(index)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          className="btn btn-success px-4 py-2 rounded-pill"
          onClick={handleSubmit}
        >
          Submit Todos
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;
