"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchAllStudySessions } from "@/server/user"; // Replace with your fetch function
import { useSelector } from "react-redux";
import { gsap } from "gsap"; // Import GSAP for animation
import "./StudySessionsCard.css";

const StudySessionsCard: React.FC = () => {
  const [sessionsData, setSessionsData] = useState<any[]>([]); // Ensure this is initialized as an array
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to format date and time in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts to local time and format
  };

  // Fetch study sessions when the user is set
  useEffect(() => {
    setLoading(true); // Start loading
    if (user && user._id) {
      fetchAllStudySessions(user._id)
        .then((sessions) => {
          console.log("sessions ", sessions);
          if (Array.isArray(sessions)) {
            setSessionsData(sessions); // Set the data
          } else {
            console.error("Error: Response is not an array", sessions);
          }
        })
        .catch((error) => {
          console.error("Error fetching study sessions:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading, whether success or error
        });
    }
  }, [user]); // Ensure it runs when the `user` state changes

  // Animate cards with GSAP when the component mounts
  useEffect(() => {
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 }
    );
  }, [sessionsData]);

  if (loading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="study-sessions">
      {sessionsData.length > 0 ? (
        <Container className="mt-4">
          <Row>
            {sessionsData.map((session, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{session.subject}</Card.Title>
                    <Card.Text>
                      <strong>Start Time:</strong> {session.startTime}
                    </Card.Text>
                    <Card.Text>
                      <strong>End Time:</strong> {session.endTime}
                    </Card.Text>
                    <Card.Text>
                      <strong>Duration:</strong> {session.duration.toFixed(0)}{" "}
                      minutes
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p className="text-center">No study sessions available.</p>
      )}
    </div>
  );
};

export default StudySessionsCard;
