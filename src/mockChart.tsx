import "./App.css";

import React, { useEffect, useRef, useState } from "react";

var Highcharts = require("highcharts");

export const MockChart = () => {
  const [componentDidMount, setComponentDidmount] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!componentDidMount) {
      Highcharts.chart(ref, {
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

      setComponentDidmount(true);
    }
  }, [componentDidMount]);

  return componentDidMount ? <div ref={ref}></div> : <div>loading</div>;
};
