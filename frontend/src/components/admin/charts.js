import React from "react";
import {
  Bar as BarChart,
  Pie as PieChart,
  Line as LineChart,
  Radar as RadarChart,
  Doughnut as DoughnutChart,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReactECharts from "echarts-for-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

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

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [4000, 9000, 6000, 11000, 14000],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
    },
  ],
};

const lineDataWithGradient = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sales",
      data: [5000, 10000, 7500, 12000, 15000],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "rgba(75, 192, 192, 0.6)");
        gradient.addColorStop(1, "rgba(153, 102, 255, 0.6)");
        return gradient;
      },
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(75, 192, 192, 1)",
      hoverBorderColor: "rgba(75, 192, 192, 1)",
      hoverBorderWidth: 2,
    },
  ],
};

const doughnutData = {
  labels: ["Product A", "Product B", "Product C"],
  datasets: [
    {
      data: [120, 90, 150],
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
  ],
};

const echartsBarOption = {
  title: { text: "ECharts Bar Chart", textStyle: { color: "#fff" } },
  tooltip: {},
  xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May"] },
  yAxis: { type: "value" },
  series: [
    {
      name: "Sales",
      type: "bar",
      data: [5000, 10000, 7500, 12000, 15000],
      color: "#4BC0C0",
    },
  ],
};

const echartsPieOption = {
  title: { text: "ECharts Pie Chart", left: "center", textStyle: { color: "#fff" } },
  tooltip: { trigger: "item" },
  series: [
    {
      type: "pie",
      radius: "50%",
      data: [
        { value: 300, name: "Red" },
        { value: 50, name: "Blue" },
        { value: 100, name: "Yellow" },
      ],
    },
  ],
};

const echartsLineOption = {
  title: { text: "ECharts Line Chart", textStyle: { color: "#fff" } },
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May"] },
  yAxis: { type: "value" },
  series: [
    {
      name: "Revenue",
      type: "line",
      data: [4000, 9000, 6000, 11000, 14000],
      color: "#FF6384",
    },
  ],
};

const echartsRadarOption = {
  title: { text: "ECharts Radar Chart", textStyle: { color: "#fff" } },
  tooltip: {},
  radar: {
    indicator: [
      { name: "Speed", max: 100 },
      { name: "Power", max: 100 },
      { name: "Agility", max: 100 },
      { name: "Stamina", max: 100 },
      { name: "Skill", max: 100 },
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        { value: [90, 80, 85, 70, 95], name: "Player A" },
        { value: [85, 75, 80, 85, 90], name: "Player B" },
      ],
    },
  ],
};

const echartsRadarNewOption = {
  title: { text: "ECharts New Radar Chart", textStyle: { color: "#fff" } },
  tooltip: {},
  radar: {
    indicator: [
      { name: "Speed", max: 100 },
      { name: "Power", max: 100 },
      { name: "Agility", max: 100 },
      { name: "Stamina", max: 100 },
      { name: "Skill", max: 100 },
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        { value: [80, 70, 90, 60, 85], name: "Player C" },
        { value: [90, 75, 80, 85, 95], name: "Player D" },
      ],
    },
  ],
};

const echartsScatterOption = {
  title: { text: "ECharts Scatter Chart", textStyle: { color: "#fff" } },
  tooltip: { trigger: "item" },
  xAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
  yAxis: { type: "value" },
  series: [
    {
      name: "Data",
      type: "scatter",
      data: [12, 25, 40, 32, 20],
      symbolSize: 10,
      color: "#FF6384",
    },
  ],
};

const echartsFunnelOption = {
  title: { text: "ECharts Funnel Chart", textStyle: { color: "#fff" } },
  tooltip: { trigger: "item" },
  series: [
    {
      type: "funnel",
      data: [
        { value: 100, name: "Visit" },
        { value: 80, name: "Inquiry" },
        { value: 60, name: "Quote" },
        { value: 40, name: "Order" },
        { value: 20, name: "Purchase" },
      ],
    },
  ],
};

const splineAreaData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Growth",
      data: [4000, 9000, 6000, 12000, 15000],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, "rgba(75, 192, 192, 0.6)");
        gradient.addColorStop(1, "rgba(153, 102, 255, 0.6)");
        return gradient;
      },
      borderWidth: 1,
      pointRadius: 5,
      fill: true,
      tension: 0.4,
    },
  ],
};

const rangeAreaData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Min Value",
      data: [5000, 8000, 6000, 10000, 12000],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      pointRadius: 0,
    },
    {
      label: "Max Value",
      data: [8000, 12000, 10000, 15000, 17000],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      pointRadius: 0,
    },
  ],
};


const ChartContainer = ({ children }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(33, 34, 45)",
      margin: "20px auto",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "none",
    }}
  >
    {children}
  </div>
);

export const RangeArea = () => (
  <ChartContainer>
    <LineChart data={rangeAreaData} options={{ responsive: true }} />
  </ChartContainer>
);


export const SplineArea = () => (
  <ChartContainer>
    <LineChart data={splineAreaData} options={{ responsive: true }} />
  </ChartContainer>
);

export const Bar = () => (
  <ChartContainer>
    <BarChart data={barData} options={{ responsive: true }} />
  </ChartContainer>
);

export const Pie = () => (
  <ChartContainer>
    <PieChart data={pieData} options={{ responsive: true }} />
  </ChartContainer>
);

export const Line = () => (
  <ChartContainer>
    <LineChart data={lineData} options={{ responsive: true }} />
  </ChartContainer>
);

export const GradientLine = () => (
  <ChartContainer>
    <LineChart data={lineDataWithGradient} options={{ responsive: true }} />
  </ChartContainer>
);

export const Doughnut = () => (
  <ChartContainer>
    <DoughnutChart data={doughnutData} options={{ responsive: true }} />
  </ChartContainer>
);

export const EBar = () => (
  <ChartContainer>
    <ReactECharts option={echartsBarOption} />
  </ChartContainer>
);

export const EPie = () => (
  <ChartContainer>
    <ReactECharts option={echartsPieOption} />
  </ChartContainer>
);

export const ELine = () => (
  <ChartContainer>
    <ReactECharts option={echartsLineOption} />
  </ChartContainer>
);

export const ERadar = () => (
  <ChartContainer>
    <ReactECharts option={echartsRadarOption} />
  </ChartContainer>
);

export const ENewRadar = () => (
  <ChartContainer>
    <ReactECharts option={echartsRadarNewOption} />
  </ChartContainer>
);

export const EScatter = () => (
  <ChartContainer>
    <ReactECharts option={echartsScatterOption} />
  </ChartContainer>
);

export const EFunnel = () => (
  <ChartContainer>
    <ReactECharts option={echartsFunnelOption} />
  </ChartContainer>
);
