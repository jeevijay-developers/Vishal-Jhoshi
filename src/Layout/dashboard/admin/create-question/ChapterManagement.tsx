import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Chapter {
  id: number;
  title: string;
  description: string;
}

const ChapterManagement: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Basics of algebraic expressions and equations.",
    },
    {
      id: 2,
      title: "Laws of Motion",
      description: "Fundamentals of Newton's laws of motion.",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newChapter, setNewChapter] = useState<Omit<Chapter, "id">>({
    title: "",
    description: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    setNewChapter({ title: "", description: "" });
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewChapter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChapter = () => {
    const newEntry: Chapter = {
      id: chapters.length > 0 ? chapters[chapters.length - 1].id + 1 : 1,
      ...newChapter,
    };
    setChapters([...chapters, newEntry]);
    handleModalClose();
  };

  const handleDelete = (id: number) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleEdit = (id: number) => {
    const chapterToEdit = chapters.find((c) => c.id === id);
    if (chapterToEdit) {
      setNewChapter({
        title: chapterToEdit.title,
        description: chapterToEdit.description,
      });
      setChapters(chapters.filter((c) => c.id !== id));
      handleModalShow();
    }
  };

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={handleModalShow}>
        Add New Chapter
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
          {chapters.map((chapter, index) => (
            <tr key={chapter.id}>
              <td>{index + 1}</td>
              <td>{chapter.title}</td>
              <td>{chapter.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(chapter.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(chapter.id)}
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
          <Modal.Title>Add / Edit Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter chapter title"
                name="title"
                value={newChapter.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter chapter description"
                name="description"
                value={newChapter.description}
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
            onClick={handleAddChapter}
            disabled={
              !newChapter.title.trim() || !newChapter.description.trim()
            }
          >
            Save Chapter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChapterManagement;
