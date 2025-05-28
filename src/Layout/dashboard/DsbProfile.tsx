import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { updateUser, updateUserImage } from "../../server/user";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);

  // user info
  const user = useSelector((state: any) => state.user);

  const [updatingUser, setUpdatingUser] = useState(false);

  console.log(user);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    location: user.location,
    birthDate: user.birthDate || "",
    image_url:
      user.image_url || "https://randomuser.me/api/portraits/women/5.jpg",
    bannerImage: user.bannerImage || "https://placehold.co/1500x1500",
  });

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      location: user.location,
      birthDate: user.birthDate || "",
      image_url:
        user.image_url || "https://randomuser.me/api/portraits/women/5.jpg",
      bannerImage: user.bannerImage || "https://placehold.co/1500x1500",
    });
  }, [user]);

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
      // upload image ->
      const form = new FormData();
      form.append("image", e.target.files[0]);

      updateUserImage(form, key, user._id)
        .then((res) => {
          toast.success("Image updated successfully!", {
            position: "top-left",
          });
          console.log(res);
        })
        .catch((err) => {
          toast.error("Failed to update image. Try again.", {
            position: "top-left",
          });
        });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setUpdatingUser(true);
    updateUser(userData, user._id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setUpdatingUser(false);
      });
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

            <Form.Control
              type="date"
              name="birthDate"
              value={
                userData.birthDate &&
                !isNaN(new Date(userData.birthDate).getTime())
                  ? new Date(userData.birthDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
            />

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
              {updatingUser ? (
                <PropagateLoader color="#308e87" />
              ) : (
                <Button variant="success" type="submit">
                  Save Changes
                </Button>
              )}
              {/* <Button variant="success" type="submit">
                Save Changes
              </Button> */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;
