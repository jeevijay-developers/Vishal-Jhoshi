"use client";
import React, { Fragment } from "react";
import ConfigDB from "@/Config/ThemeConfig";

// Dynamic imports for components
import dynamic from "next/dynamic";
import BannerSlider from "../home/BannerSlider";

// Dynamically importing components to prevent SSR issues
const ProfileCard = dynamic(() => import("./ProfileCard"), { ssr: false });
const MentorsList = dynamic(() => import("./Mentors"), { ssr: false });
const TopTests = dynamic(() => import("./TopTest"), { ssr: false });
const TestBarGraph = dynamic(() => import("./TestBarGraph"), { ssr: false });
const SubjectTimeChart = dynamic(
  () => import("../StudyMode/SubjectTimeChart"),
  { ssr: false }
);

const primary = ConfigDB.color.primary_color || "var(--theme-default)";
const secondary = ConfigDB.color.secondary_color || "var(--theme-secondary)";

const StudentDashboard = () => {
  return (
    <main className="">
      {/* Left Section */}
      <section className="d-flex flex-row flex-wrap gap-4 justify-content-center align-items-center">
        <BannerSlider />
        {/* <ProfileCard />
        
        <TopTests />
        <MentorsList /> */}
      </section>
      <section className="my-4">
        <TestBarGraph />
      </section>
      <section className="my-4">
        <SubjectTimeChart />
      </section>
    </main>
  );
};

export default StudentDashboard;
