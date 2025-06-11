// "use client";
import Reports from "@/Components/MentorReport/Reports";
import { getReportById } from "@/server/user";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { mentorId?: string };
}) => {
  const mentorId = searchParams.mentorId;
  const reports = await getReportById(mentorId);
  // console.log(reports);
  if (!reports) {
    notFound();
  }

  return (
    <div>
      <Reports report={reports} />
    </div>
  );
};

export default Page;
