import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateRole } from "@/server/users";
import UpdateMentorDetails from "./UpdateMentorDetails";
import { getAllMentors } from "@/server/user";
// import { createMentorship } from "@/server/mentorship"; // your backend function

const UpdateUser = ({ user }: { user: any }) => {
  const roleOptions = ["student", "mentor"];
  const [mentors, setMentors] = useState([]);
  const [selectedRole, setSelectedRole] = useState<string>(user?.role || "");

  useEffect(() => {
    getAllMentors()
      .then((data) => {
        setMentors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // console.log(user);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole(userId, newRole);
      toast.success("User role updated successfully!");
      setSelectedRole(newRole);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update role.");
    }
  };

  const handleMentorAssingment = (userId: string, mentorId: string) => {
    console.log(userId, mentorId);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <p className="m-0 p-0">Change role for {user?.name}</p>
          <select
            className="p-2 rounded-2"
            onChange={(e) => handleRoleChange(user._id, e.target.value)}
            value={selectedRole}
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <p className="m-0 p-0">Assign mentor for {user?.name}</p>
          <select
            className="p-2 rounded-2"
            onChange={(e) => handleMentorAssingment(user._id, e.target.value)}
          >
            <option value="">Select Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedRole === "mentor" && <UpdateMentorDetails user={user} />}
    </div>
  );
};

export default UpdateUser;
