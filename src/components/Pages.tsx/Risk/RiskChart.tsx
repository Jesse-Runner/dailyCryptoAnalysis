import {
  Col,
  Divider,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  Select,
  Space,
} from "antd";
import Highcharts, { chart } from "highcharts/highstock";
import { formatDate, formatMarketCap } from "../../../common/sharedFunctions";
import { getTotalMarketCap, test } from "../../../services/MarketCapService";
import { useEffect, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { GraphDatePicker } from "../../Common/GraphDatePicker";
import HighchartsReact from "highcharts-react-official";
import { InlineStylesModel } from "../../../models/InlineStyleModel";
import { MarketCapServicesType } from "../../../models/MarketCapServicesType";
import { RiskMetricOptions } from "../../Common/riskMetrics";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import moment from "moment";

interface RiskChartProps {
  chartHeight: string;
  chartWidth: string;
  coinData: any;
}

const styles: InlineStylesModel = {
  chartAndCoinContainer: {
    // marginLeft: "calc(20vw - 239px)",
    border: ".5px solid rgba(164,164,164,.35)",
  },
  cryptoSelectorStyle: {
    width: "max-content",
    minWidth: "25%",
    backgroundColor: "#0a0c12",
    color: "white",
  },
  cryptoSelectorCol: {
    fontSize: "20px",
    marginBottom: "0em",
    backgroundColor: "#0a0c12",
    fontWeight: 400,
    textAlign: "center",
    color: "white",
  },
  chartFooterRiskType: {
    color: "white",
    paddingLeft: "1vw",
    // paddingRight: "1vw",
    fontSize: 18,
    fontWeight: 500,
  },
  chartFooterRiskData: {
    color: "white",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    fontSize: 18,
  },
  datePickerRow: {
    backgroundColor: "#0a0c12",
    marginBottom: "10px",
    display: "flex",
    flexFlow: "row wrap",
    // justifyContent: "space-between",
    borderBottom: "1px solid rgba(164,164,164, .5)",
    zIndex: 10000,
  },
  datePickerContainer: {
    // maxWidth: "40%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    marginLeft: "auto",
  },
  datePickerTitle: {
    // width: "15%",
    backgroundColor: "#0a0c12",
    marginTop: "auto",
    marginRight: "5px",
    cursor: "pointer",
  },
  divider: {
    color: "rgba(164,164,164, .5)",
    backgroundColor: "rgba(164,164,164, .5)",
    height: "auto",
    alignSelf: "stretch",
  },
  logoStyle: {
    height: "20px",
    width: "20px",
  },
  metricSelectorStyle: {
    width: "max-content",
    minWidth: "20%",
    backgroundColor: "#0a0c12",
    color: "white",
    fontSize: "20px",
    marginBottom: "0em",
    fontWeight: 400,
    // textAlign: "center",
    cursor: "pointer",
  },
  riskFooterTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: 500,
    paddingLeft: "1vw",
    marginTop: ".75vh",
    marginBottom: ".75vh",
  },
};

export interface PriceModel {
  [index: string]: any;
}

export const RiskChart = (chartProps: RiskChartProps) => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );
  const [test, setTest] = useState<any>(0);
  const [refetchApi, setRefetchApi] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(chartProps.coinData[0]);
  const [selectedMetric, setSelectedMetric] = useState("Price");
  const [priceInformation, setPriceInformation] = useState<PriceModel>({
    "1D": { data: null, isSelected: true },
    "7D": { data: null, isSelected: false },
    "1M": { data: null, isSelected: false },
    "1Y": { data: null, isSelected: false },
  });

  const determineChartData = () => {
    let data: any = [];

    const priceInformationKeys = Object.keys(priceInformation);

    priceInformationKeys.forEach((key) => {
      if (priceInformation[key].isSelected) {
        data = priceInformation[key].data;
      }
    });

    const dataFormatted =
      data !== null
        ? data.map((index: any) => [index.time * 1000, index.open])
        : [];

    return dataFormatted;
  };

  const determineXInterval = () => {
    let selectedKey: string = "";

    const priceInformationKeys = Object.keys(priceInformation);

    priceInformationKeys.forEach((key) => {
      if (priceInformation[key].isSelected) {
        selectedKey = key;
      }
    });

    if (selectedKey === "1D") {
      return 300000;
    }
    if (selectedKey === "7D") {
      return 3600000;
    }
    if (selectedKey === "1M") {
      return 360000;
    }
    if (selectedKey === "1Y") {
      return 360000 * 24;
    }
  };
  const chartConfiguration = {
    data: determineChartData(),
    xInterval: determineXInterval(),
  };

  console.log("hello?", chartConfiguration.data);

  const [test2, setTest2] = useState({
    chart: {
      backgroundColor: "#0a0c12",
      spacing: [0, 10, 0, 10],
    },
    legend: {
      // enabled: true,
    },
    navigator: {
      enabled: false,
    },
    lang: {
      numericSymbols: ["K", "M", "B", "T", "P", "E"],
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
      gridLineColor: "rgba(164,164,164,.35)",
    },
    xAxis: {
      // type: "dateTime",
      // tickInterval: 1000 * 3600,
    },
    plotOptions: {
      series: {
        point: {
          events: {
            // mouseOver: () => console.log(this),
            mouseOver: (e: any) => setTest({ hoverData: e.category }),
          },
        },
      },
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
        data: chartConfiguration.data,
        name: "Total Market Cap",
        turboThreshold: 0,
        // pointStart: Date.UTC(2022, 7, 1),
        // pointInterval: 100 * 60 * 5,
      },
    ],
    hoverData: 0,
  });

  const handlePriceInfoChange = (object: any) => {
    setPriceInformation(object);
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap(selectedCrypto.id, "max");
      setFetchData(marketCapData.market_cap);
    };

    if (fetchData === null) {
      fetchMarketData();
    }
    if (refetchApi) {
      fetchMarketData();
      setRefetchApi(false);
    }
  }, [fetchData, refetchApi, selectedCrypto]);

  const options = {
    chart: {
      backgroundColor: "#0a0c12",
      spacing: [0, 10, 0, 10],
    },
    legend: {
      // enabled: true,
    },
    navigator: {
      enabled: false,
    },
    lang: {
      numericSymbols: ["K", "M", "B", "T", "P", "E"],
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
      gridLineColor: "rgba(164,164,164,.35)",
    },
    xAxis: {
      // type: "dateTime",
      // tickInterval: 1000 * 3600,
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: (e: any) => setTest(e.category),
            // mouseOver: (e: any) => console.log(e),
          },
        },
      },
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
        data: chartConfiguration.data,
        name: "Total Market Cap",
        turboThreshold: 0,
        // pointStart: Date.UTC(2022, 7, 1),
        // pointInterval: 100 * 60 * 5,
      },
    ],
  };

  const crytpoMenuItems =
    chartProps.coinData !== null
      ? chartProps.coinData.map((menuOption: any) => {
          return (
            <Select.Option
              key={menuOption.id}
              value={menuOption.id}
              style={{ backgroundColor: "#0a0c12" }}
            >
              <Row style={styles.datePickerTitle} align="middle">
                <Col style={styles.cryptoSelectorCol}>
                  <img
                    alt={`${menuOption.name}-logo`}
                    src={menuOption.image}
                    style={{ ...styles.logoStyle, ...{ marginRight: "10px" } }}
                  />

                  {menuOption.name}
                </Col>
              </Row>
            </Select.Option>
          );
        })
      : null;

  const cryptoSelected = (value: string) => {
    const found = chartProps.coinData.find((coin: any) => coin.id === value);
    if (found !== undefined) {
      setSelectedCrypto(found);
    }
  };

  const crytpoSelector = (
    <Select
      onChange={cryptoSelected}
      style={styles.cryptoSelectorStyle}
      defaultValue={selectedCrypto.id}
      size={"large"}
    >
      {crytpoMenuItems}
    </Select>
  );

  const metricSelected = (value: string) => {
    setSelectedMetric(value);
  };

  const metricSelector = (
    <Select
      onChange={metricSelected}
      style={styles.metricSelectorStyle}
      defaultValue={selectedMetric}
      size={"large"}
    >
      {RiskMetricOptions}
    </Select>
  );

  return (
    <div
      style={{
        ...styles.chartAndCoinContainer,
        ...{ width: chartProps.chartWidth },
      }}
    >
      <div
        style={{
          ...styles.datePickerRow,
          ...{ width: chartProps.chartWidth },
        }}
      >
        {crytpoSelector}
        <Divider type="vertical" style={styles.divider} />
        {metricSelector}
        <Divider type="vertical" style={styles.divider} />
        <Row style={styles.datePickerContainer} align="middle">
          <GraphDatePicker
            priceInformation={priceInformation}
            setPriceInformation={handlePriceInfoChange}
            selectedCoin={selectedCrypto}
          />
        </Row>
      </div>
      <HighchartsReact
        containerProps={{
          style: {
            height: chartProps.chartHeight,
            width: `calc(${chartProps.chartWidth} - 1vw)`,
          },
        }}
        highcharts={Highcharts}
        options={test2}
        constructorType={"stockChart"}
      />
      <Row style={styles.riskFooterTitle}>{"Risk"}</Row>
      <Row
        style={{
          ...styles.chartFooterRiskType,
          ...{ width: "50%" },
        }}
        justify="space-between"
      >
        <Col> {"Short"}</Col>
        <Col>{"Medium"} </Col>
        <Col>{"Long"}</Col>
      </Row>
      <Row
        style={{
          ...styles.chartFooterRiskData,
          ...{},
        }}
        justify="space-between"
      >
        <Col
          span={12}
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "1vh",
          }}
        >
          <div style={{ display: "inline" }}>{test2.hoverData}</div>
          <div style={{ display: "inline" }}>{"1.5"}</div>
          <div style={{ display: "inline" }}>{"1.5"}</div>
        </Col>
        <Col span={12} style={{ textAlign: "end" }}>
          {moment().format("D MMM, YYYY")}
        </Col>
      </Row>
    </div>
  );
};
