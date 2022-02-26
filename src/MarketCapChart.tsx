import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { formatDate, formatMarketCap } from "./common/sharedFunctions";
import { MarketCapServicesType } from "./models/MarketCapServicesType";
import { getTotalMarketCap } from "./services/MarketCapService";

export const MarketCapChart = () => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap();
      console.log("testeraooo", marketCapData);
      setFetchData(marketCapData);
    };

    if (fetchData === null) {
      fetchMarketData();
    }
  }, [fetchData]);

  const options = {
    // chart: {
    //   width: 100%,
    //   height: "100%",
    // },
    legend: {
      enabled: true,
    },
    navigator: {
      enabled: false,
    },
    lang: {
      numericSymbols: ["K", "M", "B", "T", "P", "E"],
    },
    title: {
      align: "left",
      text: "Crytpo Market Cap and Trendline",
      y: 50,
    },
    tooltip: {
      backgroundColor: "rgba(3, 24, 150, .65)",
      borderColor: "rgba(3, 172, 252, 1)",
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const mcapData = formatMarketCap(this.y);
        const date = formatDate(new Date(this.x).toDateString());
        const marketCapJSX = `<b>Market Cap: ${mcapData}</b>`;
        const dateJSX = `<b> ${date} </b>`;

        return dateJSX + `<br>` + marketCapJSX;
      },
      style: {
        color: "white",
      },
    },
    yAxis: {
      type: "logarithmic",
      opposite: false,
    },
    xAxis: {
      tickInterval: 24 * 3600 * 1000 * 365,
    },
    rangeSelector: {
      buttons: [],
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    series: [
      {
        data: fetchData,
        name: "Total Market Cap",
        turboThreshold: 0,
        pointStart: Date.UTC(2011, 8, 18),
        pointInterval: 86400000,
      },
    ],
    subtitle: {
      align: "left",
      text: "Updated 2022-02-22 - CMC: 1.69T",
      y: 80,
    },
  };
  return (
    <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
      highcharts={Highcharts}
      options={options}
      constructorType={"stockChart"}
    />
  );
};
