"use client";
import React, { useEffect, useState } from "react";
import AvailableDPP from "./AvailableDPP";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const DppWrapper = () => {
  const user = useSelector((state: any) => state.user);
  const [userRole, setUserRole] = useState("student");
  const router = useRouter();

  useEffect(() => {
    if (!user._id) return;

    setUserRole(user.role);
  }, [user]);
  return (
    <div>
      {userRole === "admin" && (
        <div className="">
          <button
            onClick={() => router.push("/create-dpp")}
            className="btn btn-primary"
          >
            Create New DPP
          </button>
        </div>
      )}
      <AvailableDPP />
    </div>
  );
};

export default DppWrapper;
