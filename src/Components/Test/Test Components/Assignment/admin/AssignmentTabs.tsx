// components/AssignAssignment.tsx
"use client";
import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import ViewAssignment from "./ViewAssignment";
import CreateAssignment from "./CreateAssignment";

const AssignAssignment: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("list");

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Assign Assignment</h1>

      <Tab.Container
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k || "list")}
      >
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="create">Create Assignment</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="list">View Assignments</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="list">
            {/* <h4>Assignment List</h4> */}
          <ViewAssignment />
          </Tab.Pane>

          <Tab.Pane eventKey="create">
            {/* <h4>Create Assignment</h4> */}
            <CreateAssignment/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default AssignAssignment;
