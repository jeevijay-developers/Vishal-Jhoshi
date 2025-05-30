"use client";
import React, { useEffect } from "react";
import TestResultCard from "./TestCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllAttendedTests } from "../../../server/tests";
import { AttendedTests } from "../../../Types/TestTypes";
// import { setChartData } from "@/Redux/Reducers/ChartData";
// import { Row } from "reactstrap";

const TestCardWrapper = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const user = useSelector((state: any) => state.user);
  const [attendedTests, setAttendedTests] = React.useState<AttendedTests[]>([]);
  useEffect(() => {
    getAllAttendedTests(user._id)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const tests = res.data.filter(
            (test: AttendedTests) => test.liveTestId !== null
          );
          setAttendedTests(tests);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="my-4">
      <Row>
        {attendedTests &&
          attendedTests.length > 0 &&
          attendedTests.map((test: AttendedTests) => (
            <Col xs={12} sm={6} lg={4} className="mb-4" key={test._id}>
              <TestResultCard test={test} setShow={setShow} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default TestCardWrapper;
