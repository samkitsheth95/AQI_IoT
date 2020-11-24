import React, { Component } from "react";
import "./BarChartShare.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

class CustomizedAxisTick extends Component {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

class BarChartShare extends Component {
  render() {
    return (
      <div className="BARCHART">
        <LineChart
          width={540}
          height={300}
          data={this.props.data.data}
          margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
        >
          <XAxis dataKey="date" tick={<CustomizedAxisTick />} reversed />
          <YAxis dataKey={this.props.data.key} domain={["auto", "auto"]} />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={this.props.data.key}
            stroke={this.props.data.color}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }
}

export default BarChartShare;
