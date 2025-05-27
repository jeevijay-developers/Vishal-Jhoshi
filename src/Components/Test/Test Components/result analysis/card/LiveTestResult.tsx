"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Chart from "react-apexcharts";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

export interface TestStats {
  userId: string;
  testId: string;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracy: number;
  totalTimeTaken: number;
  averageTimePerQuestion: number;
  createdAt?: Date;
  mark: number;
  obtainedMarks: number;
}

interface ResultProps {
  name: string;
  data: TestStats;
}

const LiveTestResults: React.FC<ResultProps> = ({ name, data }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setScore(data.obtainedMarks);
    setTotalQuestions(
      data.correctCount + data.incorrectCount + data.unansweredCount
    );
    setCorrectAnswers(data.correctCount);
    setIncorrectAnswers(data.incorrectCount);
    setSkippedQuestions(data.unansweredCount);
    setLoading(false);
  }, [data]);

  const chartOptions = {
    labels: ["Correct", "Incorrect", "Skipped"],
    colors: ["#28a745", "#dc3545", "#6c757d"],
    chart: {
      type: "donut" as "donut",
    },
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 250 },
        },
      },
    ],
  };

  const chartSeries = [correctAnswers, incorrectAnswers, skippedQuestions];

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <StyledCard className="p-4">
            <h3 className="text-center mb-4 text-primary fw-semibold">
              {name}
            </h3>
            <div className="text-center mb-4">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                width={320}
              />
              <h5 className="mt-4 text-dark fw-bold">
                Score: {score}
                <small className="text-muted ms-2">
                  out of{" "}
                  {data.mark *
                    (data.correctCount +
                      data.incorrectCount +
                      data.unansweredCount)}
                </small>
              </h5>
            </div>

            <div className="px-3">
              <h5 className="mb-3">Test Summary</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Correct
                  <Badge pill bg="success">
                    {correctAnswers}/{totalQuestions}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Incorrect
                  <Badge pill bg="danger">
                    {incorrectAnswers}/{totalQuestions}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Skipped
                  <Badge pill bg="secondary">
                    {skippedQuestions}/{totalQuestions}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Accuracy
                  <Badge pill bg="info">
                    {data?.accuracy?.toFixed(2)}%
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default LiveTestResults;
