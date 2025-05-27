"use client";
import MentorCard from "@/Components/mentors/MentorCard";
import { getMyMentor } from "@/server/users";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

const Page = () => {
  const user = useSelector((state: any) => state.user);
  const [myMentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    setError("");
    getMyMentor(user._id)
      .then((data) => {
        if (data.success && data.mentor) {
          setMentor(data.mentor);
        } else {
          setError("No mentor assigned.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch mentor.");
      })
      .finally(() => setLoading(false));
  }, [user?._id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="container py-4 d-flex justify-content-center align-items-center bg-white">
      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}
      {!error && myMentor && <MentorCard mentor={myMentor} />}
    </div>
  );
};

export default Page;
