"use client";
import React, { useEffect, useState } from "react";
import { DppMeta } from "@/Types/DppMeta";
import { getAllDpp } from "@/server/dpp";
import {
  MdOutlineClass,
  MdSubject,
  MdOutlineTopic,
  MdQuestionMark,
} from "react-icons/md";
import { GrChapterAdd } from "react-icons/gr";
import { useRouter } from "next/navigation";

const AvailableDPP = () => {
  const [dpps, setDpps] = useState<DppMeta[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllDpp()
      .then((data) => setDpps(data))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // console.log(dpps);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const router = useRouter();
  return (
    <div>
      {/* <h1>Available DPPs</h1> */}
      <ul className="list-group d-flex flex-row gap-3 justify-content-start align-items-start px-3 my-3 ">
        {dpps.map((dpp) => (
          <li
            key={dpp._id}
            className="bg-primary px-3 py-2 rounded-2 shadow-lg"
            style={{
              border: "2px solid white",
            }}
            onClick={() => router.push(`/solve-dpp/${dpp._id}`)}
          >
            <div>
              <div>
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                  <MdOutlineClass size={15} className="bg-primary" />
                  <p className="m-0 p-0">class : </p>
                  <b>{dpp.class}</b>
                </div>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                  <MdSubject size={15} className="bg-primary" />
                  <p className="m-0 p-0">Subject :</p>
                  <p className="m-0 p-0">{dpp.subject}</p>
                </div>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                  <GrChapterAdd size={15} className="bg-primary" />
                  <p className="m-0 p-0">Chapter :</p>
                  <p className="m-0 p-0">{dpp.chapter}</p>
                </div>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                  <MdOutlineTopic size={15} className="bg-primary" />
                  <p className="m-0 p-0">Topic :</p>
                  <p className="m-0 p-0">{dpp.topic}</p>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                {/* No. of Questions */}
                <MdQuestionMark size={15} className="bg-primary" />
                <p className="m-0 p-0">
                  {dpp.questions?.length || 0} <span>Questions</span>{" "}
                </p>
              </div>
              <div>
                <button className="btn btn-outline-warning">Start</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableDPP;
