import "./App.css";

import React from "react";

var Highcharts = require("highcharts");

export const App = () => {
  const chart = Highcharts.chart("container", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Fruit Consumption",
    },
    xAxis: {
      categories: ["Apples", "Bananas", "Oranges"],
    },
    yAxis: {
      title: {
        text: "Fruit eaten",
      },
    },
    series: [
      {
        name: "Jane",
        data: [1, 0, 4],
      },
      {
        name: "John",
        data: [5, 7, 3],
      },
    ],
  });

  return (
    <div className="App">
      <div style={{ width: "400px", height: "400px" }}>{chart}</div>
    </div>
  );
};
