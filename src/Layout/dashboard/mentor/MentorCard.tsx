import React from "react";
import { Card, Badge, ListGroup } from "react-bootstrap";

const MentorCard = () => {
  const mentor = {
    image: "https://via.placeholder.com/300x200.png?text=Mentor+Image",
    name: "Dr. Anjali Mehta",
    description:
      "Expert in Physics with 15+ years of experience in mentoring JEE & NEET aspirants.",
    ranking: 4.9,
    expertise: ["Physics", "Concept Building", "Doubt Solving"],
    experience: "15 years",
    availability: "Mon–Fri, 5 PM – 9 PM",
    menteesCount: 1200,
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={mentor.image}
        alt={mentor.name}
        style={{ height: "200px", objectFit: "contain" }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/assets/images/avatars/user.png";
        }}
      />
      <Card.Body>
        <Card.Title>{mentor.name}</Card.Title>
        <Card.Text>{mentor.description}</Card.Text>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Ranking:</strong>{" "}
            <Badge bg="success">{mentor.ranking} ★</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Expertise:</strong> {mentor.expertise.join(", ")}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Experience:</strong> {mentor.experience}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Availability:</strong> {mentor.availability}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total Mentees:</strong>{" "}
            <Badge bg="info">{mentor.menteesCount}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default MentorCard;
