// components/AssignAssignment.tsx
"use client";
import React, { useState } from "react";
import { Tab, Nav, Card, Row, Col } from "react-bootstrap";
import ViewAssignment from "./ViewAssignment";
import CreateAssignment from "./CreateAssignment";

const AssignAssignment: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("list");

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📘 Assign Assignment</h2>

      <Card className="shadow-lg rounded-4 p-3">
        <Tab.Container
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k || "list")}
        >
          <Row>
            {/* Small vertical tabs on the left */}
            <Col xs={4} sm={3} md={2}>
              <Nav variant="pills" className="flex-column gap-2">
                <Nav.Item>
                  <Nav.Link
                    eventKey="create"
                    className={`py-1 px-2 small ${
                      activeKey === "create"
                        ? "fw-bold text-white bg-primary"
                        : ""
                    }`}
                  >
                    ➕ Create
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="list"
                    className={`py-1 px-2 small ${
                      activeKey === "list"
                        ? "fw-bold text-white bg-success"
                        : ""
                    }`}
                  >
                    📄 View
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            {/* Tab content area */}
            <Col xs={8} sm={9} md={10}>
              <Tab.Content>
                <Tab.Pane eventKey="create">
                  <CreateAssignment />
                </Tab.Pane>
                <Tab.Pane eventKey="list">
                  <ViewAssignment />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card>
    </div>
  );
};

export default AssignAssignment;
