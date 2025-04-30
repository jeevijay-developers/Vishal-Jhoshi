import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MentorCard from "./MentorCard";

const MentorCardGrid = () => {
  return (
    <Container className="my-4">
      <Row>
        {[...Array(6)].map((_, idx) => (
          <Col key={idx} xs={12} sm={6} lg={4} className="mb-4">
            <MentorCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MentorCardGrid;
