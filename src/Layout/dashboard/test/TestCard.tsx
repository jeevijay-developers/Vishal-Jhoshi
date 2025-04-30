import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const TestResultCardAdmin = () => {
  // Dummy test data
  const testData = {
    title: "JEE Advanced Mock Test - 3",
    description:
      "This test covers Physics, Chemistry, and Math. Based on latest exam pattern.",
    totalParticipants: 500,
    maxMarks: 360,
    date: "2025-04-30",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
  };

  // Function to handle view result button click
  const handleViewResult = () => {
    alert("View result functionality to be implemented.");
  };

  return (
    <Card className="shadow mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">{testData.title}</h5>
        <small>{testData.description}</small>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col sm={6} md={4}>
            <strong>Total Participants:</strong> {testData.totalParticipants}
          </Col>
          <Col sm={6} md={4}>
            <strong>Max Marks:</strong> {testData.maxMarks}
          </Col>
          <Col sm={6} md={4}>
            <strong>Date:</strong> {testData.date}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={6} md={4}>
            <strong>Start Time:</strong> {testData.startTime}
          </Col>
          <Col sm={6} md={4}>
            <strong>End Time:</strong> {testData.endTime}
          </Col>
        </Row>

        {/* View Result Button */}
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleViewResult}>
            View Result
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestResultCardAdmin;
