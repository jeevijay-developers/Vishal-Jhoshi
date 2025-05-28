"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/Redux/Reducers/ChatSlice";
import { updateSeen } from "@/server/chats";

const NewChatSidebar = dynamic(() => import("./NewChatSidebar"), {
  ssr: false,
});
const NewChatMessageBox = dynamic(() => import("./NewChatMessageBox"), {
  ssr: false,
});

interface User {
  _id: string;
  name: string;
  email: string;
  image_url: string;
  seenBy: string[];
}

const NewChatComp = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const [selectedUser, setselectedUser] = useState<User | null>(null);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const dispatch = useDispatch();
  const USER = useSelector((state: any) => state.user);

  useEffect(() => {
    const handleScreenResize = () => {
      if (typeof window === "undefined") return;

      const sidebar = sidebarRef.current;
      const chat = chatRef.current;

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
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  const handleUserSelect = useCallback(
    (user: User) => {
      setselectedUser(user);
      dispatch(setSelectedUser(user));

      updateSeen(USER._id, user._id, USER._id)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      if (typeof window === "undefined") return;

      const sidebar = sidebarRef.current;
      const chat = chatRef.current;

      if (window.innerWidth < 768 && sidebar && chat) {
        sidebar.style.width = "0%";
        chat.style.width = "100%";
        setShowIcon(true);
      }
    },
    [dispatch, USER._id]
  );

  const handleGoBack = useCallback(() => {
    dispatch(setSelectedUser(null));
    setselectedUser(null);

    if (typeof window === "undefined") return;

    const sidebar = sidebarRef.current;
    const chat = chatRef.current;

    if (window.innerWidth < 768 && sidebar && chat) {
      sidebar.style.width = "100%";
      chat.style.width = "0%";
      setShowIcon(false);
    }
  }, [dispatch]);

  return (
    <div>
      <div ref={mainRef} className="d-flex align-items-start flex-row">
        <div ref={sidebarRef}>
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
