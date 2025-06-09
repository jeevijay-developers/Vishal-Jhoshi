"use client";
import { getAllHomeworks } from "@/server/homework";
import { Homework } from "@/Types/DppMeta";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Homeworks = () => {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const HW = await getAllHomeworks();
        setHomeworks(HW);
      } catch (error) {
        toast.error("Failed to fetch homeworks. Please try again.");
      }
    };
    fetchHomework();
  }, []);

  if (!homeworks || homeworks.length === 0)
    return (
      <div>
        {" "}
        <p>No Homeworks</p>{" "}
      </div>
    );
  return (
    <div className="mx-3">
      <h1>Homeworks</h1>
      <table className="table table-striped table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">Class</th>
            <th scope="col">Target</th>
            <th scope="col">Subject</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {homeworks.map((hw) => (
            <tr key={hw._id}>
              <td>{hw.class || "N/A"}</td>
              <td>{hw.target ?? "N/A"}</td>
              <td>{hw.subject ?? "N/A"}</td>
              <td>
                {" "}
                <a
                  href={`${hw.link}`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Click to view
                </a>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homeworks;
