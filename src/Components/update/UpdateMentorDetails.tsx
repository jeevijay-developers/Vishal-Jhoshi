import { createMentorship, getMentorshipDetails } from "@/server/user";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateMentorDetails = ({ user }: { user: any }) => {
  const [mentorshipData, setMentorshipData] = useState({
    ranking: 0,
    experties: [""],
    experience: "",
    menteesCount: 0,
  });
  const handleMentorshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await createMentorship({ ...mentorshipData, userId: user._id });
      // console.log(mentorshipData);
      createMentorship(mentorshipData, user._id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      toast.success("Mentorship profile created!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save mentorship data.");
    }
  };

  const handleMentorshipChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "experties" && typeof index === "number") {
      const newExperties = [...mentorshipData.experties];
      newExperties[index] = value;
      setMentorshipData({ ...mentorshipData, experties: newExperties });
    } else {
      setMentorshipData({
        ...mentorshipData,
        [name]:
          name === "ranking" || name === "menteesCount"
            ? Number(value) > 5
              ? 0
              : Number(value)
            : value,
      });
    }
  };

  const handleAddExpertise = () => {
    setMentorshipData({
      ...mentorshipData,
      experties: [...mentorshipData.experties, ""],
    });
  };

  useEffect(() => {
    getMentorshipDetails(user._id)
      .then((res) => {
        if (res.mentorship != null) {
          setMentorshipData(res.mentorship);
        }
        console.log(res);

        // toast.success("Mentorship profile created!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to save mentorship data.");
      });
  }, [user]);

  return (
    <div className="d-flex justify-content-center align-items-center container-lg">
      <form
        onSubmit={handleMentorshipSubmit}
        className="mt-4 border rounded p-3 w-100"
      >
        <h5 className="mb-3">Mentorship Details</h5>

        <div className="mb-3">
          <label className="form-label">Ranking</label>
          <input
            type="number"
            name="ranking"
            className="form-control"
            value={mentorshipData.ranking}
            onChange={handleMentorshipChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <input
            type="text"
            name="experience"
            className="form-control"
            value={mentorshipData.experience}
            onChange={handleMentorshipChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mentees Count</label>
          <input
            type="number"
            name="menteesCount"
            className="form-control"
            value={mentorshipData.menteesCount}
            onChange={handleMentorshipChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Expertise</label>
          {mentorshipData.experties.map((item, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              name="experties"
              value={item}
              onChange={(e) => handleMentorshipChange(e, index)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={handleAddExpertise}
          >
            Add More Expertise
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Save Mentorship
        </button>
      </form>
    </div>
  );
};

export default UpdateMentorDetails;
