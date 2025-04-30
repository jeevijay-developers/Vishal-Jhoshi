import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TestInfoCard from "./TestInfoCard";

const TestInfoGrid = () => {
  return (
    <Container className="my-4">
      <Row>
        {[...Array(4)].map((_, idx) => (
          <Col key={idx} xs={12} sm={6} lg={4} className="mb-4">
            <TestInfoCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestInfoGrid;
