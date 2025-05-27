import React from "react";
import {
  FaEnvelope,
  FaUserGraduate,
  FaUsers,
  FaStar,
  FaBookOpen,
  FaBullseye,
} from "react-icons/fa";

const MentorCard = ({ mentor }: { mentor: any }) => {
  console.log(mentor);

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
        </ul>
      </div>
    </div>
  );
};

export default MentorCard;
