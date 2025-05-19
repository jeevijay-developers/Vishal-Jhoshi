import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import "./style.css";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "********",
    bio: "A passionate web developer!",
    location: "San Francisco, CA",
    birthDate: "1995-07-12",
    image_url: "https://randomuser.me/api/portraits/women/5.jpg",
    bannerImage: "https://placehold.co/1500x1500",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "image_url" | "bannerImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          [key]: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    console.log("Updated user data:", userData);
    // TODO: Send updated data to backend
  };

  const handleDelete = () => {
    alert("Delete profile functionality to be implemented.");
  };

  return (
    <>
      {/* Cover and Profile Image with Edit Icons */}
      <div className="position-relative">
        <div
          style={{
            backgroundImage: `url(${userData.bannerImage})`,
            height: "250px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Cover Image Edit */}
        <label
          htmlFor="bannerImageInput"
          className="position-absolute top-0 end-0 m-3 bg-white p-2 rounded-circle shadow"
          style={{ cursor: "pointer" }}
        >
          <FaPencilAlt />
        </label>
        <input
          type="file"
          id="bannerImageInput"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "bannerImage")}
          style={{ display: "none" }}
        />

        {/* Profile Image Overlapping */}
        <div className="profile-pic-wrapper">
          <Image
            src={userData.image_url}
            alt="Profile"
            width="130"
            height="130"
            roundedCircle
            className="border border-white shadow"
          />
          <label
            htmlFor="profileImageInput"
            className="edit-icon bg-white rounded-circle shadow"
          >
            <FaPencilAlt size={14} />
          </label>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "image_url")}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Profile Info */}
      <Container className="mt-5 pt-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h2>{userData.name}</h2>
                <p className="text-muted">{userData.email}</p>
                <p>{userData.bio || "No bio available."}</p>
                <p>
                  <strong>Location:</strong>{" "}
                  {userData.location || "Not provided"}
                </p>
                <p>
                  <strong>Birth Date:</strong>{" "}
                  {userData.birthDate
                    ? new Date(userData.birthDate).toLocaleDateString()
                    : "Not provided"}
                </p>

                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Update Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                rows={3}
                value={userData.bio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={userData.location}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;
