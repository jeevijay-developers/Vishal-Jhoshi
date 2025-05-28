"use client";
// import MentorCard from "@/Components/mentors/MentorCard";
const MentorCard = dynamic(() => import("@/Components/mentors/MentorCard"), {
  ssr: false,
});
import { getAllUsersAndMentors } from "@/server/users";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const page = () => {
  const [allMentors, setMentors] = useState([]);
  const roleOptions = ["student", "mentor"];
  // const [updateUser, setUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const GetAllUsersAndMentors = async () => {
    try {
      setLoading(true);
      const data = await getAllUsersAndMentors();

      // setUsers(data);
      console.log(data.mentors);
      setMentors(data.mentors);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllUsersAndMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {allMentors &&
        allMentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
    </div>
  );
};

export default page;
