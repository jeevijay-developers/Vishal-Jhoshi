"use client";
import React, { useState } from "react";
import { Tab, Nav, Card, Row, Col } from "react-bootstrap";
import ViewAssignment from "./ViewAssignment";
import CreateAssignment from "./CreateAssignment";

const AssignAssignment: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("list");

  return (
    <div className="container">
      <Card className="shadow-lg rounded-4 p-3">
        <Tab.Container
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k || "list")}
        >
          {/* Horizontal Nav Tabs */}
          <Nav variant="pills" className="justify-content-start mb-4 gap-3">
            <Nav.Item>
              <Nav.Link
                eventKey="create"
                className={`px-3 py-2 ${
                  activeKey === "create" ? "fw-bold text-white bg-primary" : ""
                }`}
              >
                ➕ Create
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="list"
                className={`px-3 py-2 ${
                  activeKey === "list" ? "fw-bold text-white bg-success" : ""
                }`}
              >
                📄 View
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Tab content area */}
          <Tab.Content>
            <Tab.Pane eventKey="create">
              <CreateAssignment />
            </Tab.Pane>
            <Tab.Pane eventKey="list">
              <ViewAssignment />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </div>
  );
};

export default AssignAssignment;
