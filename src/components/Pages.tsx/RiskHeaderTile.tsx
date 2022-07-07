import { Col, Divider, Row, Select } from "antd";
import { fetchGlobalData, test } from "../../services/MarketCapService";
import { useEffect, useState } from "react";

import { InlineStylesModel } from "../../models/InlineStyleModel";
import { PercentageChangeDominance } from "../Common/PercentageChangeDominance";
import { PercentageChangeMcap } from "../Common/PercentageChangeMCap";
import { PercentageChangePrice } from "../Common/PercentageChangePrice";

const styles: InlineStylesModel = {
  dashboardPageTitle: {
    fontSize: 30,
    fontWeight: 400,
    color: "white",
  },
  cryptoSelectorStyle: {
    width: "max-content",
    minWidth: "12%",
    backgroundColor: "#0a0c12",
    color: "white",
    marginLeft: "calc(20vw - 239px)",
    padding: 0,
    marginTop: "1vh",
  },
  datePickerTitle: {
    backgroundColor: "#0a0c12",
    marginTop: "auto",
    marginRight: "5px",
    cursor: "pointer",
  },
  headerContainer: {
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
    // borderBottom: "1px solid rgba(164, 164, 164, 0.35)",
    marginBottom: "5px",
  },
  logoStyle: {
    height: "20px",
    width: "20px",
  },
  riskTopTileContainer: {
    borderRadius: 15,
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
    // border: ".5px solid rgba(164,164,164,.35)",
    backgroundColor: "rgba(29,41,57,.5)",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  tileHeader: {
    display: "inline-block",
    paddingRight: ".8vw",
  },
  tileStyle: {
    fontSize: 35,
    fontWeight: 600,
    color: "white",
  },
  tileStyleDominance: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
  test: {
    color: "rgba(164, 164, 164, 0.35)",
    backgroundColor: "rgba(164, 164, 164, 0.35)",
    height: "80%",
    marginRight: "10px",
    marginLeft: "10px",
  },
  tileColumns: {
    backgroundColor: "rgba(29,41,57,.5)",
  },
};

export const RiskHeaderTile = ({ coinData }: any) => {
  const [selectedCrypto, setSelectedCrypto] = useState(coinData[0]);
  const [totalMarketCap, setTotalMarketCap] = useState<null | number>(null);
  const [refetchMarketCap, setRefetchMarketCap] = useState(false);

  useEffect(() => {
    const fetchTotalMarketCap = async () => {
      const totalMarketCapData = await fetchGlobalData(selectedCrypto.symbol);
      setTotalMarketCap(totalMarketCapData);
    };

    if (totalMarketCap === null) {
      fetchTotalMarketCap();
    }

    if (refetchMarketCap) {
      fetchTotalMarketCap();
      setRefetchMarketCap(false);
    }
  }, [refetchMarketCap, selectedCrypto.symbol, totalMarketCap]);

  const cryptoSelected = (value: string) => {
    const found = coinData.find((coin: any) => coin.id === value);
    if (found !== undefined) {
      setSelectedCrypto(found);
      setRefetchMarketCap(true);
    }
  };

  const crytpoMenuItems2 =
    coinData !== null
      ? coinData.map((menuOption: any) => {
          return (
            <Select.Option
              key={menuOption.id}
              value={menuOption.id}
              style={{ backgroundColor: "#0a0c12" }}
            >
              <Row style={styles.datePickerTitle} align="middle">
                <Col
                  style={{
                    fontSize: "20px",
                    marginBottom: "0em",
                    backgroundColor: "#0a0c12",
                    fontWeight: 400,
                    textAlign: "center",
                    color: "white",
                  }}
                >
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
      defaultValue={selectedCrypto.id}
      size={"large"}
    >
      {crytpoMenuItems2}
    </Select>
  );

  return (
    <>
      {/* <h2 style={styles.headerContainer}>
        <div style={styles.dashboardPageTitle}>{"Risk"}</div>
      </h2> */}
      {crytpoSelector}
      <Row style={styles.riskTopTileContainer} align="middle">
        <Col span={8}>
          <Row justify="space-between" style={styles.tileStyle}>
            <Col>
              <div style={styles.tileHeader}>{"Price"}</div>
              <div style={styles.tileHeader}>
                {selectedCrypto.current_price}
              </div>
            </Col>
            <Col>
              <Divider style={styles.test} type="vertical" />
            </Col>
          </Row>
          <PercentageChangePrice coin={selectedCrypto} />
        </Col>
        <Col span={8}>
          <Row justify="space-between" style={styles.tileStyle}>
            <Col>
              <div style={styles.tileHeader}>{"Market Cap"}</div>
              <div style={styles.tileHeader}>{selectedCrypto.market_cap}</div>
            </Col>
            <Col>
              <Divider style={styles.test} type="vertical" />
            </Col>
          </Row>
          <PercentageChangeMcap coin={selectedCrypto} />
        </Col>
        <Col span={8}>
          <Row justify="space-between" style={styles.tileStyleDominance}>
            <Col>{"Dominance"}</Col>
            <Col>{`${totalMarketCap?.toFixed(2)}%`}</Col>
          </Row>
          <Row justify="space-between" style={styles.tileStyleDominance}>
            <Col>{"Outstanding Supply"}</Col>
            <Col>{selectedCrypto.formattedCircSupply}</Col>
          </Row>
          <Row justify="space-between" style={styles.tileStyleDominance}>
            <Col>{"Max Supply"}</Col>
            <Col>{selectedCrypto.formattedMaxSupply}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
