import { setChartData } from "@/Redux/Reducers/ChartData";
import { getTestDataFromBackend } from "@/server/tests";
import { AttendedTests } from "@/Types/TestTypes";
import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  test: AttendedTests;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const TestResultCardAdmin: React.FC<Props> = ({ test, setShow }) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const getTestData = (_id: string) => {
    const userId = user._id;

    getTestDataFromBackend(_id, userId)
      .then((data) => {
        console.log(data);
        dispatch(setChartData(data?.data));
        setShow("RESULT");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card className="shadow mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">{test?.liveTestId?.category ?? ""}</h5>
        <small>{test?.liveTestId?.testName ?? ""}</small>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <strong>Date: </strong>{" "}
            {test?.liveTestId?.date?.split("T")[0] ?? ""}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <strong>Start Time:</strong> {test?.startTime?.split("T")[0] ?? ""}
          </Col>
          <Col>
            <strong>End Time:</strong> {test?.endTime?.split("T")[0] ?? ""}
          </Col>
        </Row>

        {/* View Result Button */}
        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={() => getTestData(test.liveTestId._id)}
          >
            View Result
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestResultCardAdmin;
