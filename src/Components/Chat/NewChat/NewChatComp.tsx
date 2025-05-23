"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import NewChatSidebar from "./NewChatSidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DasbBoardHeader from "@/Layout/dashboard/DasbBoardHeader";
import NewChatMessageBox from "./NewChatMessageBox";

const NewChatComp = () => {
  const sidebarRef = useRef(null);
  const chatRef = useRef(null);
  const mainRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScreenResize = () => {
      const sidebar = sidebarRef.current as HTMLDivElement | null;
      const chat = chatRef.current as HTMLDivElement | null;

      if (sidebar && chat) {
        if (window.innerWidth < 768) {
          sidebar.style.width = "100%";
          chat.style.width = "0%";
          setIsSmallDevice(true);
        } else {
          sidebar.style.width = "27%";
          chat.style.width = "73%";
          setIsSmallDevice(false);
        }
      }
    };
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  const handleUserSelect = useCallback((user: string) => {
    setSelectedUser(user);
    const sidebar = sidebarRef.current as HTMLDivElement | null;
    const chat = chatRef.current as HTMLDivElement | null;

    if (window.innerWidth < 768 && sidebar && chat) {
      sidebar.style.width = "0%";
      chat.style.width = "100%";
      setShowIcon(true);
    }
  }, []);

  const handleGoBack = useCallback(() => {
    const sidebar = sidebarRef.current as HTMLDivElement | null;
    const chat = chatRef.current as HTMLDivElement | null;

    if (window.innerWidth < 768 && sidebar && chat) {
      sidebar.style.width = "100%";
      chat.style.width = "0%";
      setShowIcon(false);
    }
  }, []);

  return (
    <div className="">
      {/* <DasbBoardHeader /> */}
      <div ref={mainRef} className="d-flex flex-row ">
        <div ref={sidebarRef} className="">
          <NewChatSidebar
            handleUserSelect={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>
        <div ref={chatRef}>
          <NewChatMessageBox
            selectedUser={selectedUser}
            handleGoBack={handleGoBack}
            isSmallDevice={isSmallDevice}
            showIcon={showIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default NewChatComp;
