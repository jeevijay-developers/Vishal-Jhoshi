"use client";
import { createDppMetaInfo, publishDpp } from "@/server/tests";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DppQuestionUpload from "./DppQuestionUpload";
import { toast } from "react-toastify";
import { setTestId } from "@/Redux/Reducers/TestCounterSlice";

interface DPPData {
  class: "10" | "11" | "12" | "DROP";
  subject: string;
  chapter: string;
  topic: string;
}
const CreateDpp = () => {
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [formData, setFormData] = useState<DPPData>({
    class: "DROP",
    subject: "",
    chapter: "",
    topic: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  // const [questionForm , setShowQuestionForm] = useState(false);
  const [dppId, setDppId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting", formData);

    createDppMetaInfo(formData)
      .then((data) => {
        console.log(data);
        setDppId(data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(dppId);
  const handlePublishTest = () => {
    // Handle publishing the test here
    publishDpp(dppId)
      .then((data) => {
        toast.success("Test published successfully!");
        console.log(data);
        setDppId("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {dppId !== "" ? (
        <DppQuestionUpload
          dppId={dppId}
          handlePublishTest={handlePublishTest}
          setDppId={setDppId}
        />
      ) : (
        <div className="container mt-5">
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <h2 className="text-center mb-4">Create DPP</h2>

            <div className="mb-3">
              <label htmlFor="class" className="form-label">
                Class
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="DROP">DROP</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="chapter" className="form-label">
                Chapter
              </label>
              <input
                type="text"
                id="chapter"
                name="chapter"
                value={formData.chapter}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                className="btn btn-warning"
                onClick={() => router.push(`/dpps`)}
              >
                Go To Dpp's
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateDpp;
