"use client";
// import NewChatComp from "@/Components/Chat/NewChat/NewChatComp";
import dynamic from "next/dynamic";
import React from "react";
const NewChatComp = dynamic(
  () => import("../../../Components/Chat/NewChat/NewChatComp"),
  { ssr: false }
);

const page = () => {
  // return <PrivateChatContainer />;
  return (
    <div>
      <NewChatComp />
    </div>
  );
};

export default page;
