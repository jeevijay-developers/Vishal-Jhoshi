"use client";

import React, { useState } from "react";
import { uploadHomework } from "@/server/homework";
import { toast } from "react-toastify";
// import { table } from "console";
type FormData = {
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadHomeworkForm: React.FC<FormData> = ({ setOpenForm }) => {
  const [formData, setFormData] = useState({
    class: "11",
    target: "JEE Main",
    subject: "",
    documentLink: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    subject: "",
    documentLink: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await uploadHomework(formData);
      if (!result.status) {
        setErrors(result.errors);
        return;
      }
      toast.success(result.message ?? "Homework uploaded successfully");
      setOpenForm(false);
    } catch (error) {
      console.error("Error uploading homework:", error);
    }
  };

  return (
    <div
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md space-y-4"
      style={{
        top: "0px",
        left: "50%",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* Select Class */}
        <div className="my-3">
          <label htmlFor="class" className="block font-medium text-gray-700">
            Select Class
          </label>
          <select
            name="class"
            id="class"
            className="form-select"
            value={formData.class}
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
          >
            {["6", "7", "8", "9", "10", "11", "12", "Dropper"].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Target */}
        <div className="my-3">
          <label htmlFor="target" className="block font-medium text-gray-700">
            Target Class
          </label>
          <select
            name="target"
            id="target"
            className="form-select"
            value={formData.target}
            onChange={(e) =>
              setFormData({ ...formData, target: e.target.value })
            }
          >
            {["JEE Main", "JEE Advance", "NEET"].map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="my-3">
          <label htmlFor="subject" className="block font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            aria-describedby={`${errors.subject ? "subject-error" : undefined}`}
            aria-invalid={`${!!errors.subject}`}
            className="form-control"
          />
          {errors.subject && (
            <p
              className="text-sm text-red-600 mt-1 text-danger"
              style={{
                fontWeight: "300",
                fontSize: "15px",
              }}
              id="subject-error"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* Document Link */}
        <div className="my-3">
          <label htmlFor="link" className="block font-medium text-gray-700">
            Document Link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            required
            value={formData.documentLink}
            onChange={(e) =>
              setFormData({ ...formData, documentLink: e.target.value })
            }
            placeholder="https://example.com/homework.pdf"
            className="form-control"
            aria-describedby={`${
              errors.documentLink ? "documentLink-error" : undefined
            }`}
            aria-invalid={`${!!errors.documentLink}`}
          />
          {errors.documentLink && (
            <p
              className="text-sm text-red-600 mt-1 text-danger"
              style={{
                fontWeight: "300",
                fontSize: "15px",
              }}
              id="documentLink-error"
            >
              {errors.documentLink}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="my-3">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
          <button
            onClick={() => setOpenForm(false)}
            className="btn btn-danger w-full mx-3"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadHomeworkForm;
