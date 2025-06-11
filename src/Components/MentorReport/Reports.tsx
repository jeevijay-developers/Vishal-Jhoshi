import { Report } from "@/Types/DppMeta";
import Link from "next/link";
import React from "react";
// import { Link } from "react-bootstrap/lib/Navbar";

type Props = {
  report: Report[];
};

const Reports: React.FC<Props> = ({ report }) => {
  return (
    <div className="container-md">
      <div>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/mentor-reports">Report</Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <td>SN</td>
            <td>Date</td>
            <td>Report Reason</td>
            <td>Message</td>
          </tr>
        </thead>
        <tbody>
          {report &&
            report.map((rep, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{new Date(rep.createdAt).toDateString()}</td>
                  <td>{rep.report}</td>
                  <td>{rep.message}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
