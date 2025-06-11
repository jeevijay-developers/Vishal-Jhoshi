"use client";
import { getReports } from "@/server/user";
import { MentorReport } from "@/Types/DppMeta";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useRouter } from "next/navigation";

const MentorWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<MentorReport[]>([]);
  const router = useRouter();

  useEffect(() => {
    getReports()
      .then((data) => {
        setReports([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (reports.length === 0) return <div>No Reports Found</div>;

  const createAnAvatar = createAvatar(shapes, {
    seed: "Felix",
    flip: false,
  });

  // console.log(createAnAvatar.toString());

  return (
    <div className="container-md bg-white">
      <h1 className="text-center my-2">Mentors those have been reported</h1>
      <table className="table table-bordered table-primary table-striped">
        <thead>
          <tr>
            <td>S.N</td>
            <td>Image</td>
            <td>Name</td>
            <td>Email</td>
            <td>Total Reports</td>
            <td>View Reports</td>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  height={80}
                  width={80}
                  src={report.mentor.image}
                  alt={report.mentor.name}
                  onError={(e: any) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                      createAnAvatar.toString()
                    )}`;
                  }}
                  className="rounded-circle"
                  style={{
                    maxWidth: "80px",
                    maxHeight: "80px",
                  }}
                />
              </td>
              <td>{report.mentor?.name ?? "N/A"}</td>
              <td>{report.mentor?.email ?? "N/A"}</td>
              <td>{report.count ?? "0"}</td>
              <td>
                <button
                  onClick={() => {
                    router.push(
                      `/mentor-reports/view-report?mentorId=${report.mentor._id}`
                    );
                  }}
                  className="btn btn-outline-primary"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorWrapper;
