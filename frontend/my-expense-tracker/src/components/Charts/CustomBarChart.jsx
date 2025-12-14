import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data }) => {

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300 max-w-xs">
          <p className="text-xs font-semibold text-purple-600 mb-2">{data.date}</p>
          {data.items?.map((item, idx) => (
            <div key={idx} className="text-xs text-gray-600 mb-1">
              <span className="font-medium">{item.category || item.source}:</span> Rs{item.amount}
            </div>
          ))}
          <p className="text-sm font-semibold text-gray-900 mt-2 pt-2 border-t border-gray-200">
            Total: Rs{data.amount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }} 
            stroke="none" />
          <Tooltip content={CustomToolTip} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
