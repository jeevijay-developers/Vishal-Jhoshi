import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReScheduleCard from "./ReScheduleCard";

const ReScheduleGridAdmin = () => {
  return (
    <Container className="my-4">
      <Row>
        {[...Array(6)].map((_, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} className="mb-4">
            <ReScheduleCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReScheduleGridAdmin;
