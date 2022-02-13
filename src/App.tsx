import "./App.css";

import React, { useEffect, useState } from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { MarketCapServicesType } from "./models/MarketCapServicesType";
import { getTotalMarketCap } from "./services/MarketCapService";

export const App = () => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap();
      setFetchData(marketCapData);
    };

    if (fetchData === null) {
      fetchMarketData();
    }
  }, [fetchData]);

  const options = {
    // chart: {
    //   type: "spline",
    // },
    title: {
      text: "Total Crypto Market Cap",
    },
    series: [
      {
        data: fetchData,
        turboThreshold: 0,
      },
    ],
  };

  console.log(fetchData);

  const chart = (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={"stockChart"}
      />
    </div>
  );

  return chart;
};
