import React from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "./style.css";

const UserProfile = () => {
  // Dummy user data based on the schema
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "********",
    bio: "A passionate web developer!",
    location: "San Francisco, CA",
    birthDate: "1995-07-12",
    image_url: "https://randomuser.me/api/portraits/women/5.jpg",
    bannerImage: "https://placehold.co/1500x1500",
  };

  // Placeholder functions for update and delete actions
  const handleUpdate = () => {
    alert("Update profile functionality to be implemented.");
  };

  const handleDelete = () => {
    alert("Delete profile functionality to be implemented.");
  };

  return (
    <div>
      {/* Banner Image */}
      <div
        style={{
          backgroundImage: `url(${userData.bannerImage})`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Container className="mt-5">
        <Row>
          {/* Profile Image */}
          <Col md={4} className="text-center">
            <div
              className="profilePicture"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "150px",
                height: "150px",
                border: "5px solid white",
                position: "relative",
                margin: "auto",
              }}
            >
              <Image
                src={userData.image_url}
                alt="Profile"
                roundedCircle
                width="150"
              />
            </div>
          </Col>

          {/* User Info */}
          <Col md={8} className="mt-4 mt-md-0 profileData">
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

                {/* Buttons for Update and Delete */}
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleUpdate}>
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
    </div>
  );
};

export default UserProfile;
