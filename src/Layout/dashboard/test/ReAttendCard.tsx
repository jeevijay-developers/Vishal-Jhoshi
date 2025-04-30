import React from "react";
import { Card, Button } from "react-bootstrap";

const ReAttendCard = () => {
  const dummyTest = {
    title: "Physics Chapter Test - Kinematics",
    description: "Test your understanding of motion in one and two dimensions.",
    date: "2025-05-01",
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>{dummyTest.title}</Card.Title>
        <Card.Text className="text-muted">{dummyTest.description}</Card.Text>
        <Card.Text>
          <strong>Date:</strong> {dummyTest.date}
        </Card.Text>

        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" className="w-50 me-2">
            Attend
          </Button>
          <Button variant="outline-success" className="w-50">
            Result
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReAttendCard;
