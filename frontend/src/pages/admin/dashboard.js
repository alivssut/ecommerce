import React from "react";
import Card from "../../components/admin/card";
import { RangeArea, Pie, EBar, EPie, ERadar, ELine, Doughnut, SplineArea, EScatter, ENewRadar, GradientLine } from "../../components/admin/charts";
import { FaDollarSign, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <section className="dashboard-section">

      <div className="section-item">
        <div className="dashboard-cards">
          <Card icon={<FaUsers />} title="تعداد کاربران" value="10,000" />
          <Card icon={<FaBox />} title="تعداد محصولات" value="500" />
          <Card icon={<FaShoppingCart />} title="تعداد سفارشات" value="1,200" />
          <Card icon={<FaDollarSign />} title="کل فروش" value="$50,000" />
        </div>
      </div>

      <div className="dashboard-charts-row">
        <div className="section-item" style={{ gridColumn: "span 2" }}>
          <div className="dashboard-chart">
            <RangeArea />
          </div>
        </div>
        <div className="section-item" style={{ gridColumn: "span 1" }}>
          <div className="dashboard-chart">
            <EPie />
          </div>
        </div>
      </div>
      <div className="dashboard-charts-row">
        <div className="section-item" style={{ gridColumn: "span 4" }}>
          <div className="dashboard-chart">
            <SplineArea />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
