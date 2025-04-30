import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReAttendCard from "./ReAttendCard";

const ReAttendGrid = () => {
  return (
    <Container className="my-4">
      <Row>
        {[...Array(6)].map((_, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} className="mb-4">
            <ReAttendCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReAttendGrid;
