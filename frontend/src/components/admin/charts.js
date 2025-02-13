// Charts.js
import React from "react";
import {
  Bar as BarChart,
  Pie as PieChart,
  Scatter as ScatterChart,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all required Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Bar Chart Data
const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sales",
      data: [5000, 10000, 7500, 12000, 15000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

// Pie Chart Data
const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Votes",
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

// Bar Chart Component
export const Bar = () => {
  return (
    <div className="chart">
      <BarChart data={barData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Sales Overview",
              font: { size: 18 },
              color: "#333",
            },
          },
        }}
        style={{ minWidth: "100%" }} />
    </div>
  );
};

// Pie Chart Component
export const Pie = () => {
  return (
    <div className="chart">
      <PieChart data={pieData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Sales Overview",
              font: { size: 18 },
              color: "#333",
            },
          },
        }}
        style={{ width: "100%" }} />
    </div>
  );
};