import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Topic {
  id: number;
  title: string;
}

const TagManagement: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, title: "Quadratic Equations" },
    { id: 2, title: "Gravitation" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
    setNewTopicTitle("");
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleAddTopic = () => {
    const newEntry: Topic = {
      id: topics.length > 0 ? topics[topics.length - 1].id + 1 : 1,
      title: newTopicTitle.trim(),
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
      setNewTopicTitle(topicToEdit.title);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic.id}>
              <td>{index + 1}</td>
              <td>{topic.title}</td>
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
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
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
            disabled={!newTopicTitle.trim()}
          >
            Save Topic
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TagManagement;
