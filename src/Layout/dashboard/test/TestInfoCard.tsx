import React from "react";
import { Card, Button, Row, Col, Badge, ListGroup } from "react-bootstrap";

const TestInfoCard = () => {
  const test = {
    name: "JEE Main Full Syllabus Test - 1",
    description: "Covers all chapters of Physics, Chemistry & Math.",
    positive_marks: "+4",
    negative_marks: "-1",
    instruction: "Do not refresh the page during the test.",
    class: "Class 12",
    batch: "Alpha 2025",
    accessibility: "Premium",
    date: "2025-05-01",
    time: "10:00 AM",
    duration: "3 hours",
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="mb-2">{test.name}</Card.Title>
        <Card.Text className="text-muted">{test.description}</Card.Text>

        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item>
            <strong>Positive Marks:</strong> {test.positive_marks}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Negative Marks:</strong> {test.negative_marks}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Instruction:</strong> {test.instruction}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Class:</strong> {test.class}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Batch:</strong> {test.batch}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Accessibility:</strong>{" "}
            <Badge
              bg={test.accessibility === "Free" ? "success" : "warning"}
              text="dark"
            >
              {test.accessibility}
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date:</strong> {test.date}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Time:</strong> {test.time}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Duration:</strong> {test.duration}
          </ListGroup.Item>
        </ListGroup>

        <Row>
          <Col>
            <Button variant="primary" className="w-100 mb-2">
              View
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" className="w-100 mb-2">
              Print
            </Button>
          </Col>
          <Col>
            <Button variant="success" className="w-100 mb-2">
              Download
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TestInfoCard;
