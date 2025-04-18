"use client";

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

/**
 * @typedef {Object} DataEntry
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef {Object} SalesStatusPieChartProps
 * @property {DataEntry[]} data
 */

const COLORS = ["#4ade80", "#facc15", "#f87171"]; 

export default function SalesStatusPieChart({ data }) {

  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
