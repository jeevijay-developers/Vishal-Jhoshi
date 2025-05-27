"use client";
import dynamic from "next/dynamic";
const MentorForm = dynamic(() => import("@/Components/mentors/MentorForm"), {
  ssr: false,
});
import React from "react";

const page = () => {
  return (
    <div>
      <MentorForm />
    </div>
  );
};

export default page;
