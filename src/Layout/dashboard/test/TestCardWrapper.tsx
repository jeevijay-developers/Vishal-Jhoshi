import React from "react";
import TestResultCard from "./TestCard";
import { Container, Row, Col } from "react-bootstrap";
// import { Row } from "reactstrap";

const TestCardWrapper = () => {
  return (
    <Container className="my-4">
      <Row>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        ].map((index) => (
          <Col xs={12} sm={6} lg={4} className="mb-4" key={index}>
            <TestResultCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestCardWrapper;
