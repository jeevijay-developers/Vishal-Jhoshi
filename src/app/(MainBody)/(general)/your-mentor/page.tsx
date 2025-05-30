"use client";
// import MentorCard from "../../../../Layout/dashboard/mentor/MentorCard";
const MentorCard = dynamic(
  () => import("../../../../Layout/dashboard/mentor/MentorCard"),
  {
    ssr: false,
  }
);
import dynamic from "next/dynamic";
import React from "react";

const page = () => {
  return (
    <div>
      <MentorCard />
    </div>
  );
};

export default page;
