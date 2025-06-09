"use client";
import React, { Fragment } from "react";
import ConfigDB from "@/Config/ThemeConfig";

// Dynamic imports for components
import dynamic from "next/dynamic";
import BannerSlider from "../home/BannerSlider";
import Leaderboard from "../home/leaderboard/leaderboard";
import PieChart from "../home/Piechart";
import Information from "../home/Information";
// import AssignmentTabs from "./Assignment/admin/AssignmentTabs";

// Dynamically importing components to prevent SSR issues
// const ProfileCard = dynamic(() => import("./ProfileCard"), { ssr: false });
// const MentorsList = dynamic(() => import("./Mentors"), { ssr: false });
// const TopTests = dynamic(() => import("./TopTest"), { ssr: false });
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
      <section className="d-flex flex-row flex-wrap gap-4 justify-content-center align-items-center">
        <section className="my-4">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <PieChart
              title="Test Scores Distribution"
              data={[80, 70, 90]}
              labels={["Physics", "Chemistry", "Maths"]}
            />
            <PieChart
              title="Study Time Distribution"
              data={[40, 30, 50]}
              labels={["Physics", "Chemistry", "Maths"]}
            />
          </div>
        </section>
        <div
          style={{
            minWidth: "400px",
          }}
        >
          <Leaderboard />
        </div>
      </section>

      <section className="my-4">
        {/* <Information /> */}
        <TestBarGraph />
      </section>
      <section className="my-4">
        <SubjectTimeChart />
      </section>
      {/* <section className="my-4">
        <AssignmentTabs />
      </section> */}
    </main>
  );
};

export default StudentDashboard;
