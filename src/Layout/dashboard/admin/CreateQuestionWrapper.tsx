import React from "react";
import CreateQuestionHeader from "./create-question/CreateQuestionHeader";
import SubjectManagement from "./create-question/SubjectManagement";
import ChapterManagement from "./create-question/ChapterManagement";
import TopicManagement from "./create-question/TopicManagement";
import TagManagement from "./create-question/TagManagement";

const CreateQuestionWrapper = () => {
  return (
    <div>
      <CreateQuestionHeader />
      {/* <SubjectManagement /> */}
      {/* <ChapterManagement /> */}
      {/* <TopicManagement /> */}
      <TagManagement />
    </div>
  );
};

export default CreateQuestionWrapper;
