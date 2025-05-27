"use client";
import UpdateUser from "@/Components/update/UpdateUser";
import {
  assignMentors,
  getAllUsers,
  getAllUsersAndMentors,
  updateRole,
} from "@/server/users";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, Table } from "reactstrap";

const Page = () => {
  const [allMentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const roleOptions = ["student", "mentor"];
  // const [updateUser, setUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const GetAllUsersAndMentors = async () => {
    try {
      const data = await getAllUsersAndMentors();
      // setUsers(data);
      console.log(data);
      setMentors(data.mentors);
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    GetAllUsersAndMentors();
  }, []);

  const alreadyAssignedMentor = (mentorId: string): string => {
    if (!allMentors || allMentors.length === 0) return "Open this select menu";

    const mentor = allMentors.find((mentor) => mentor._id === mentorId);
    return mentor ? mentor.name : "Open this select menu";
  };

  const handleMentorChange = async (studentId: string, newMentorId: string) => {
    try {
      const saved = await assignMentors(studentId, newMentorId);
      console.log(saved);

      setStudents((prev) =>
        prev.map((student) =>
          student._id === studentId
            ? { ...student, mentors: newMentorId }
            : student
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className="mt-2">
        <CardHeader>Users</CardHeader>
        <Table striped responsive>
          <thead className="p-2">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Mentor</th>
              <th>Assign Mentor</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((user: any, index) => (
                <tr key={user?._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{user?.mentors?.name ?? "Not assigned"}</td>
                  <td>
                    <select
                      className="form-select w-fit"
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleMentorChange(user._id, e.target.value);
                      }}
                    >
                      <option selected>
                        {user.mentors === null
                          ? "Open this select menu"
                          : alreadyAssignedMentor(user.mentors)}
                      </option>
                      {allMentors.map((ment) => (
                        <option key={ment._id} value={ment._id}>
                          {ment.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>{" "}
        {selectedUser != null && <UpdateUser user={selectedUser} />}
        {/* <UpdateUser user={user} /> */}
        <CardFooter className="text-center">
          {students.length} Students found
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
