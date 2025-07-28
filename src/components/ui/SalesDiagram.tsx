import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define props interface
interface SalesDiagramProps {
  salesData: { date: string; amount: number }[];
}

const SalesDiagram: React.FC<SalesDiagramProps> = ({ salesData }) => {
  // Prepare chart data
  const chartData = {
    labels: salesData.map((data) => data.date),
    datasets: [
      {
        label: "Sales Amount ($)",
        data: salesData.map((data) => data.amount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "E-shop Sales Over Time",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesDiagram;
