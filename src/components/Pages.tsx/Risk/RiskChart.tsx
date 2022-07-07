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
  containerUnderChart: {
    width: "60vw",
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
};

export const RiskChart = (chartProps: RiskChartProps) => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );
  const [refetchApi, setRefetchApi] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(chartProps.coinData[0]);
  const [selectedMetric, setSelectedMetric] = useState("Price");
  const [priceInformation, setPriceInformation] = useState({
    "1D": { data: null, isSelected: true },
    "7D": { data: null, isSelected: false },
    "1M": { data: null, isSelected: false },
    "1Y": { data: null, isSelected: false },
  });

  const handlePriceInfoChange = (object: any) => {
    console.log("test", object);
    setPriceInformation(object);
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap(selectedCrypto.id, "max");
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

  const options = {
    chart: {
      backgroundColor: "#0a0c12",
      spacing: [0, 10, 0, 10],
    },
    legend: {
      enabled: false,
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
        options={options}
        constructorType={"stockChart"}
      />
      <Row style={styles.containerUnderChart}></Row>
    </div>
  );
};
