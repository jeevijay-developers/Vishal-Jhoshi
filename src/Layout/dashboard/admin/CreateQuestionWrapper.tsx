"use client";
import React, { useState } from "react";
import CreateQuestionHeader from "./create-question/CreateQuestionHeader";
import SubjectManagement from "./create-question/SubjectManagement";
import ChapterManagement from "./create-question/ChapterManagement";
import TopicManagement from "./create-question/TopicManagement";
import TagManagement from "./create-question/TagManagement";
import CreateSelectQuestionForm from "./create-question/questions/CreateSelectQuestionForm";

const CreateQuestionWrapper = () => {
  const [show, setShow] = useState("SUBJECT");
  return (
    <div>
      <CreateQuestionHeader setShow={setShow} />
      {show === "SUBJECT" && <SubjectManagement />}
      {show === "CHAPTER" && <ChapterManagement />}
      {show === "TOPIC" && <TopicManagement />}
      {show === "TAG" && <TagManagement />}
      {show === "SELECT" && <CreateSelectQuestionForm />}
      {/* <ChapterManagement /> */}
      {/* <TopicManagement /> */}
      {/* <TagManagement /> */}
    </div>
  );
};

export default CreateQuestionWrapper;
