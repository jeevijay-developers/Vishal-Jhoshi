'use client';
// import AssignAssignment from '@/Components/Dashboard/Assignment/admin/AssignmentTabs';

import dynamic from "next/dynamic";

const AssignAssignment = dynamic(
  () => import("@/Components/Dashboard/Assignment/admin/AssignmentTabs"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <AssignAssignment />
  )
}

export default page