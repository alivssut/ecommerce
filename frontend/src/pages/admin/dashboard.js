import React from "react";
import Card from "../../components/admin/card";
import { Bar, Pie } from "../../components/admin/charts";
import { FaDollarSign, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <section className="dashboard-section">
      <h1>Welcome to the Dashboard</h1>

      <div className="dashboard-cards">
        <Card icon={<FaDollarSign />} title="Total Sales" value="$50,000" />
        <Card icon={<FaShoppingCart />} title="Total Orders" value="1,200" />
        <Card icon={<FaBox />} title="Total Products" value="500" />
        <Card icon={<FaUsers />} title="Total Users" value="10,000" />
      </div>

      <div className="dashboard-charts-row">
        <div className="dashboard-chart" style={{ gridColumn: "span 2" }}>
          <Bar />
        </div>

        <div className="dashboard-chart" style={{ gridColumn: "span 1" }}>
          <Pie />
        </div>
      </div>
      <div className="dashboard-charts-row">
        <div className="dashboard-chart" style={{ gridColumn: "span 4" }}>
          <Bar />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
