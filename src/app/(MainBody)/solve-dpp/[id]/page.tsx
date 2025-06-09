import React from "react";
import SolveDpp from "@/Components/dpps/SolveDpp";

const page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  return (
    <div>
      {" "}
      <SolveDpp id={id} />{" "}
    </div>
  );
};

export default page;
