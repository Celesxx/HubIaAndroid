import React from "react";
import "../css/core.css";
import "../css/input.css";
import Bottombar from "./components/bottom.bar";
import Paper from "@material-ui/core/Paper";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
class graph extends React.Component {
  render() {
    return (
      <header className="body">
        <Paper
          elevation={3}
          style={{
            margin: 50,
            backgroundColor: "#252C32",
          }}
        >
          <Paper
            elevation={3}
            style={{
              margin: 10,
              backgroundColor: "#383F47",
            }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Paper>

        <Bottombar></Bottombar>
      </header>
    );
  }
}

export default graph;
