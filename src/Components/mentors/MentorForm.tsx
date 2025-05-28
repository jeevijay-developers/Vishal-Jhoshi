"use client";
import { createNewMentor } from "@/server/user";
import React, { useState } from "react";
import { toast } from "react-toastify";

type MentorFormData = {
  name: string;
  email: string;
  password: string;
  target: "JEE Mains" | "JEE Advanced" | "NEET";
  mentorship: {
    ranking: number;
    experties: string[];
    experience: string;
    menteesCount: number;
  };
};

const MentorForm = () => {
  const [formData, setFormData] = useState<MentorFormData>({
    name: "",
    email: "",
    password: "",
    target: "JEE Mains",
    mentorship: {
      ranking: 0,
      experties: [],
      experience: "",
      menteesCount: 0,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (["ranking", "menteesCount"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        mentorship: {
          ...prev.mentorship,
          [id]: parseInt(value),
        },
      }));
    } else if (id === "experties") {
      setFormData((prev) => ({
        ...prev,
        mentorship: {
          ...prev.mentorship,
          experties: value.split(",").map((e) => e.trim()),
        },
      }));
    } else if (["experience"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        mentorship: {
          ...prev.mentorship,
          experience: value,
        },
      }));
    } else if (["target"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        target: value as MentorFormData["target"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // alert("heujh");
    // Destructure fields
    const { name, email, password, target, mentorship } = formData;
    const { ranking, experties, experience, menteesCount } = mentorship;

    // Client-side validation
    const errors: string[] = [];

    if (!name || !email || !password || !target) {
      errors.push("All user fields are required.");
    }

    const allowedTargets = ["JEE Mains", "JEE Advanced", "NEET"];
    if (!allowedTargets.includes(target)) {
      errors.push("Target must be one of: JEE Mains, JEE Advanced, or NEET.");
    }

    if (!ranking && ranking !== 0) errors.push("Ranking is required.");
    if (!Array.isArray(experties) || experties.length === 0)
      errors.push("At least one area of expertise is required.");
    if (!experience) errors.push("Experience is required.");
    if (!menteesCount && menteesCount !== 0)
      errors.push("Mentees count is required.");

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    // Send API request
    try {
      console.log(formData);

      const res = await createNewMentor(formData);
      console.log(res);
      toast.success("Mentor registered successfully!");
    } catch (error) {
      toast.error("Error registering mentor. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mentor Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            className="form-control"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="target" className="form-label">
            Target
          </label>
          <select
            id="target"
            className="form-select"
            value={formData.target}
            onChange={handleChange}
            required
          >
            <option value="JEE Mains">JEE Mains</option>
            <option value="JEE Advanced">JEE Advanced</option>
            <option value="NEET">NEET</option>
          </select>
        </div>

        <hr />
        <h5 className="mt-4">Mentorship Info</h5>

        <div className="mb-3">
          <label htmlFor="ranking" className="form-label">
            Ranking
          </label>
          <input
            id="ranking"
            className="form-control"
            type="number"
            value={formData.mentorship.ranking}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="experties" className="form-label">
            Experties (comma separated)
          </label>
          <input
            id="experties"
            className="form-control"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="experience" className="form-label">
            Experience
          </label>
          <input
            id="experience"
            className="form-control"
            type="text"
            value={formData.mentorship.experience}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="menteesCount" className="form-label">
            Mentees Count
          </label>
          <input
            id="menteesCount"
            className="form-control"
            type="number"
            value={formData.mentorship.menteesCount}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MentorForm;
