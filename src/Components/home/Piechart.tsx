// components/charts/PieChart.tsx

import React from "react";
import Chart from "react-apexcharts";

interface PieChartProps {
  title: string;
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ title, data, labels }) => {
  const options = {
    chart: {
      type: "pie" as "pie",
    },
    labels: labels,
    legend: {
      position: "bottom" as const,
    },
    title: {
      text: title,
      align: "center" as const,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      }
    },
  };

  return (
    <div>
      <Chart options={options} series={data} type="pie" width="100%" height={300} />
    </div>
  );
};

export default PieChart;
