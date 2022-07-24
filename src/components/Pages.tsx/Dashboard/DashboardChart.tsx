import { Col, Row, Select } from "antd";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { InlineStylesModel } from "../../../models/InlineStyleModel";
import { GraphDatePicker } from "../../Common/GraphDatePicker";
import { PriceModel } from "../Risk/RiskChart";
import Highcharts from "highcharts/highstock";
import { formatDate, formatMarketCap } from "../../../common/sharedFunctions";

const styles: InlineStylesModel = {
  chartAndCoinContainer: {
    // marginLeft: "calc(20vw - 239px)",
    border: ".5px solid rgba(164,164,164,.35)",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    borderRadius: 25,
    backgroundColor: "rgb(22,24,29)",
  },
  cryptoSelectorStyle: {
    width: "max-content",
    minWidth: "25%",
    // backgroundColor: "#0a0c12",
    color: "white",
  },
  cryptoSelectorCol: {
    fontSize: "16px",
    marginBottom: "0em",
    // backgroundColor: "#0a0c12",
    fontWeight: 400,
    textAlign: "center",
    color: "white",
  },
  datePickerRow: {
    // backgroundColor: "#0a0c12",
    marginBottom: "10px",
    display: "flex",
    flexFlow: "row wrap",
    borderBottom: "1px solid rgba(164,164,164, .5)",
    // paddingLeft: 10,
    // height: "5vh",
  },
  datePickerContainer: {
    marginLeft: "auto",
  },
  datePickerTitle: {
    // backgroundColor: "#0a0c12",
    marginTop: "auto",
    marginRight: "5px",
    cursor: "pointer",
  },
  logoStyle: {
    height: "20px",
    width: "20px",
  },
};

interface DashChartProps {
  chartHeight: string;
  chartWidth: string;
  coinData: any;
}

export const DashboardChart = (chartProps: DashChartProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState(
    chartProps.coinData !== null ? chartProps.coinData[0] : null
  );
  const [priceInformation, setPriceInformation] = useState<PriceModel>({
    "1D": { data: null, isSelected: true },
    "7D": { data: null, isSelected: false },
    "1M": { data: null, isSelected: false },
    "1Y": { data: null, isSelected: false },
  });

  const cryptoSelected = (value: string) => {
    const found = chartProps.coinData.find((coin: any) => coin.id === value);
    if (found !== undefined) {
      setSelectedCrypto(found);
    }
  };
  const handlePriceInfoChange = (object: any) => {
    setPriceInformation(object);
  };

  const crytpoMenuItems =
    chartProps.coinData !== null
      ? chartProps.coinData.map((menuOption: any) => {
          return (
            <Select.Option
              key={menuOption.id}
              value={menuOption.id}
              style={{
                backgroundColor: "#0a0c12",
              }}
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

  const crytpoSelector = (
    <Select
      onChange={cryptoSelected}
      style={styles.cryptoSelectorStyle}
      value={selectedCrypto !== null ? selectedCrypto.id : null}
      size={"large"}
    >
      {crytpoMenuItems}
    </Select>
  );

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

  const options = {
    chart: {
      backgroundColor: "rgb(22,24,29)",
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
    // plotOptions: {
    //   series: {
    //     point: {
    //       events: {
    //         mouseOver: (e: any) => setTest(e.category),
    //         // mouseOver: (e: any) => console.log(e),
    //       },
    //     },
    //   },
    // },
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

  useEffect(() => {
    // The purpose of this statement is a safeguard against slow internet connections
    // Where the coindata api call from the parent element hasnt completed and passed its prop down
    if (selectedCrypto === null) {
      if (chartProps.coinData !== null) {
        setSelectedCrypto(chartProps.coinData[0]);
      }
    }
  });

  return (
    <Row
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
        <Row style={styles.datePickerContainer} align="middle">
          {chartProps.coinData !== null ? (
            <GraphDatePicker
              priceInformation={priceInformation}
              setPriceInformation={handlePriceInfoChange}
              selectedCoin={selectedCrypto}
            />
          ) : null}
        </Row>
      </div>
      <HighchartsReact
        containerProps={{
          style: {
            height: chartProps.chartHeight,
            width: `calc(${chartProps.chartWidth} - 1vw)`,
            borderRadius: "25px",
            // backgroundColor: "rgb(22,24,29)",
          },
        }}
        highcharts={Highcharts}
        options={options}
        constructorType={"stockChart"}
      />
    </Row>
  );
};
