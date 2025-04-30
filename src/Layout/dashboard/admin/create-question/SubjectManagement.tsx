import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Subject {
  id: number;
  title: string;
  description: string;
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, title: "Mathematics", description: "Study of numbers and shapes" },
    { id: 2, title: "Physics", description: "Study of matter and energy" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState<Omit<Subject, "id">>({
    title: "",
    description: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    setNewSubject({ title: "", description: "" });
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    const newEntry: Subject = {
      id: subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1,
      ...newSubject,
    };
    setSubjects([...subjects, newEntry]);
    handleModalClose();
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  const handleEdit = (id: number) => {
    const subjectToEdit = subjects.find((s) => s.id === id);
    if (subjectToEdit) {
      setNewSubject({
        title: subjectToEdit.title,
        description: subjectToEdit.description,
      });
      setSubjects(subjects.filter((s) => s.id !== id)); // remove so it gets re-added on save
      handleModalShow();
    }
  };

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={handleModalShow}>
        Add New Subject
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.id}>
              <td>{index + 1}</td>
              <td>{subject.title}</td>
              <td>{subject.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(subject.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(subject.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject title"
                name="title"
                value={newSubject.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter subject description"
                name="description"
                value={newSubject.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddSubject}
            disabled={
              !newSubject.title.trim() || !newSubject.description.trim()
            }
          >
            Save Subject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubjectManagement;
