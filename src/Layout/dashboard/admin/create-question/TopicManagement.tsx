import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Topic {
  id: number;
  title: string;
  description: string;
}

const TopicManagement: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      title: "Quadratic Equations",
      description: "Topic on solving quadratic equations",
    },
    {
      id: 2,
      title: "Gravitation",
      description: "Basic principles of gravitation",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTopic, setNewTopic] = useState<Omit<Topic, "id">>({
    title: "",
    description: "",
  });

  const handleModalClose = () => {
    setShowModal(false);
    setNewTopic({ title: "", description: "" });
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTopic((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTopic = () => {
    const newEntry: Topic = {
      id: topics.length > 0 ? topics[topics.length - 1].id + 1 : 1,
      ...newTopic,
    };
    setTopics([...topics, newEntry]);
    handleModalClose();
  };

  const handleDelete = (id: number) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleEdit = (id: number) => {
    const topicToEdit = topics.find((t) => t.id === id);
    if (topicToEdit) {
      setNewTopic({
        title: topicToEdit.title,
        description: topicToEdit.description,
      });
      setTopics(topics.filter((t) => t.id !== id));
      handleModalShow();
    }
  };

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={handleModalShow}>
        Add New Topic
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
          {topics.map((topic, index) => (
            <tr key={topic.id}>
              <td>{index + 1}</td>
              <td>{topic.title}</td>
              <td>{topic.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(topic.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(topic.id)}
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
          <Modal.Title>Add / Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter topic title"
                name="title"
                value={newTopic.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter topic description"
                name="description"
                value={newTopic.description}
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
            onClick={handleAddTopic}
            disabled={!newTopic.title.trim() || !newTopic.description.trim()}
          >
            Save Topic
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopicManagement;
