import "./App.css";

import React, { useEffect, useRef, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const App = () => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      },
    ],
  };
  const chart = (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );

  return chart;
};
