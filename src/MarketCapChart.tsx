import { Col, Dropdown, Menu, Row, Select } from "antd";
import {
  fetchTop100Coins,
  getTotalMarketCap,
} from "./services/MarketCapService";
import { formatDate, formatMarketCap } from "./common/sharedFunctions";
import { useEffect, useState } from "react";

import { ReactComponent as BitcoinLogo } from "./images/bitcoin-btc-logo.svg";
import { CaretDownOutlined } from "@ant-design/icons";
import { GraphDatePicker } from "./components/Common/GraphDatePicker";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { InlineStylesModel } from "./models/InlineStyleModel";
import { MarketCapServicesType } from "./models/MarketCapServicesType";

interface MarketCapChartType {
  chartHeight: string;
}

const styles: InlineStylesModel = {
  chartAndCoinContainer: {
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
    border: ".5px solid rgba(164,164,164,.35)",
  },
  cryptoSelectorStyle: {
    // width: "15%",
    width: "max-content",
    minWidth: "11%",
    backgroundColor: "#0a0c12",
    color: "white",
  },
  datePickerRow: {
    backgroundColor: "#0a0c12",
    width: "60vw",
    // marginLeft: "calc(20vw - 239px)",
    marginBottom: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },
  datePickerTitle: {
    // width: "15%",
    backgroundColor: "#0a0c12",
    marginTop: "auto",
    marginRight: "5px",
    cursor: "pointer",
  },
  datePickerContainer: {
    maxWidth: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  cryptoLogoContainer: {
    // width: "25%",
    height: "100%",
    width: "100%",
  },
  cryptoSelectArrow: {
    paddingTop: "9px",
  },
  logoStyle: {
    height: "20px",
    width: "20px",
  },
};

export const MarketCapChart = ({ chartHeight }: MarketCapChartType) => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );
  const [top100Coins, setTop100Coins] = useState<any>(null);
  const [refetchApi, setRefetchApi] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");

  // Responsible for fetching the market cap data
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap(selectedCrypto);
      console.log("testeraooo", marketCapData);
      setFetchData(marketCapData);
    };

    if (fetchData === null) {
      fetchMarketData();
    }
    if (refetchApi) {
      fetchMarketData();
      setRefetchApi(false);
    }
  }, [fetchData, refetchApi, selectedCrypto]);

  // Responsible for refetch of market data on new coin selection
  useEffect(() => {
    const getTop100Coins = async () => {
      const coinData = await fetchTop100Coins();
      setTop100Coins(coinData);
    };

    if (top100Coins === null) {
      getTop100Coins();
    }
  }, [top100Coins]);

  const options = {
    chart: {
      backgroundColor: "#0a0c12",
      // borderColor: "rgba(164,164,164,.35)",
      // borderRadius: 20,
      // borderWidth: 1,
      spacing: [0, 0, 0, 0],
    },
    legend: {
      enabled: true,
    },
    navigator: {
      enabled: false,
    },
    lang: {
      numericSymbols: ["K", "M", "B", "T", "P", "E"],
    },
    // title: {
    //   align: "left",
    //   text: "Crytpo Market Cap and Trendline",
    //   y: 50,
    // },
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
      gridLineColor: "rgba(164,164,164,.35)",
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
        pointStart: Date.UTC(2013, 4, 27),
        pointInterval: 86400000,
      },
    ],
    // subtitle: {
    //   align: "left",
    //   text: "Updated 2022-02-22 - CMC: 1.69T",
    //   y: 80,
    // },
  };

  const crytpoMenuItems2 =
    top100Coins !== null
      ? top100Coins.data.map((menuOption: any) => {
          return (
            <Select.Option
              key={menuOption.id}
              value={menuOption.id}
              style={{ backgroundColor: "#0a0c12" }}
            >
              <Row style={styles.datePickerTitle} align="middle" gutter={8}>
                <Col style={styles.cryptoLogoContainer} span={4}>
                  <img
                    alt={`${menuOption.name}-logo`}
                    src={menuOption.image}
                    style={styles.logoStyle}
                  />
                </Col>
                <Col span={20}>
                  <h1
                    style={{
                      fontSize: "20px",
                      marginBottom: "0em",
                      backgroundColor: "#0a0c12",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    {menuOption.name}
                  </h1>
                </Col>
              </Row>
            </Select.Option>
          );
        })
      : null;

  const cryptoSelected = (value: string) => {
    console.log("value selected", value);
    setSelectedCrypto(value);
    setRefetchApi(true);
  };

  const cryptoSearch = (value: string) => {
    console.log("value selected", value);
  };

  const crytpoSelector = (
    <Select
      onChange={cryptoSelected}
      onSearch={cryptoSearch}
      style={styles.cryptoSelectorStyle}
      defaultValue={selectedCrypto}
      size={"large"}
    >
      {crytpoMenuItems2}
    </Select>
  );

  console.log("here is the fetched data", top100Coins);
  return (
    <div style={styles.chartAndCoinContainer}>
      <div style={styles.datePickerRow}>
        {crytpoSelector}
        <div style={styles.datePickerContainer}>
          <GraphDatePicker />
        </div>
      </div>
      <HighchartsReact
        containerProps={{
          style: {
            height: chartHeight,
            width: "59vw",
            // marginLeft: "calc(20vw - 239px)",
          },
        }}
        highcharts={Highcharts}
        options={options}
        constructorType={"stockChart"}
      />
    </div>
  );
};
