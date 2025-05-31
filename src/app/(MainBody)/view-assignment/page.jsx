'use client';

import dynamic from "next/dynamic";
// import AssignAssignment from '@/Components/Dashboard/Assignment/admin/AssignmentTabs';
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