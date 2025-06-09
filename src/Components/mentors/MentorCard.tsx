"use client";
import { reportMentor } from "@/server/homework";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaUserGraduate,
  FaUsers,
  FaStar,
  FaBookOpen,
  FaBullseye,
} from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
const mentorComplaints = [
  "Mentor is not responsive or takes too long to reply",
  "Mentor is not providing clear guidance or feedback",
  "Mentor misses scheduled sessions or meetings",
  "Mentor is not approachable or supportive",
  "Mentor lacks subject knowledge or preparation",
];
const MentorCard = ({ mentor }: { mentor: any }) => {
  // console.log(mentor);

  const [showReportForm, setShowReportForm] = React.useState(false);
  const [report, setReport] = useState({
    mentorId: mentor._id,
    reason: mentorComplaints[0],
    message: "",
  });

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await reportMentor(report);
      setShowReportForm(false);
    } catch (error) {
      console.log(error);
    }
    console.log(report);
  };

  const image =
    mentor.image_url || "https://api.dicebear.com/9.x/adventurer/svg";

  return (
    <div
      className="card shadow-sm border-0 rounded-4 mb-4"
      style={{ maxWidth: "22rem" }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={image}
            alt={mentor.name}
            className="rounded-circle border me-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-1 fw-bold">{mentor.name}</h5>
            <p className="mb-0 text-muted small">
              <FaEnvelope className="me-1" />
              {mentor.email}
            </p>
          </div>
        </div>

        <ul className="list-group list-group-flush small">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <FaUserGraduate className="me-2 text-primary" />
              Experience
            </span>
            <span>{mentor.mentorship?.experience || 0} yrs</span>
          </li>
          <li className="list-group-item">
            <FaBookOpen className="me-2 text-success" />
            <strong>Expertise:</strong>
            <ul className="mb-0 mt-1 ps-4">
              {mentor.mentorship?.experties?.map((exp: string, idx: number) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <FaUsers className="me-2 text-warning" />
              Mentees
            </span>
            <span>{mentor?.mentorship?.menteesCount || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <FaStar className="me-2 text-warning" />
              Ranking
            </span>
            <span>{mentor.mentorship?.ranking || 0} / 5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <FaBullseye className="me-2 text-danger" />
              Target
            </span>
            <span>{mentor.target || "N/A"}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <FaUsers className="me-2 text-info" />
              Students Assigned
            </span>
            <span>{mentor.mentorship?.students?.length || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <MdOutlineReportProblem className="me-2 text-info" />
              Report Mentor
            </span>
            <span>
              <button
                onClick={() => setShowReportForm(true)}
                className="btn btn-sm btn-danger"
              >
                Report
              </button>
            </span>
          </li>
        </ul>
      </div>
      {showReportForm && (
        <div
          className="h-full position-absolute top-0 left-0 card-footer"
          style={{
            width: "50vw",
            height: "100vh",
          }}
        >
          <form onSubmit={handleReportSubmit} className="px-3">
            <div className="mb-3 d-flex flex-column gap-2 my-3">
              <label htmlFor="reportReason" className="form-label">
                Why are you reporting this mentor?
              </label>
              <select
                className="form-select"
                name="reportReason"
                id=""
                onChange={(e) =>
                  setReport({ ...report, reason: e.target.value })
                }
              >
                {mentorComplaints.map((complaint: string, idx: number) => (
                  <option key={idx} value={complaint}>
                    {complaint}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3  d-flex flex-column gap-2 my-3">
              <label htmlFor="reportReason" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="reportReason"
                placeholder="Enter your message here..."
                rows={3}
                onChange={(e) =>
                  setReport({ ...report, message: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-3 d-flex flex-row gap-2 my-3">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button
                onClick={() => setShowReportForm(false)}
                className="btn btn-outline-danger mx-3"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MentorCard;
