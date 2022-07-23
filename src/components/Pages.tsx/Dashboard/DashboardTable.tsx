import { Col, Row } from "antd";
import { InlineStylesModel } from "../../../models/InlineStyleModel";

const styles: InlineStylesModel = {
  coinImage: {
    height: 20,
    width: 20,
    marginLeft: ".5vw",
    marginTop: 5,
    marginBottom: 5,
  },
  coinNameCol: {
    fontWeight: 600,
  },
  headerRow: {
    color: "rgb(146,153,170)",
    // marginLeft: ".5vw",
    backgroundColor: "rgb(22,24,29)",
    // paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: 16,
  },
  headerRowTop: {
    color: "rgb(146,153,170)",
    backgroundColor: "rgb(22,24,29)",
    fontSize: 16,
  },
  headerPadding: {
    paddingLeft: ".5vw",
  },
  individualRowEven: {
    color: "white",
  },
  individualRowOdd: {
    color: "white",
    // marginLeft: ".5vw",
    backgroundColor: "rgb(22,24,29)",
  },
  tabledMainContainer: {
    // border: ".5px solid rgba(164,164,164,.35)",
    // borderRadius: 25,
    width: "70vw",
    marginLeft: "calc(20vw - 239px)",
    // padding: "10px 10px",
  },
};

export const DashboardTable = ({ coinData }: any) => {
  const headerRowTop = (
    <Row style={styles.headerRowTop}>
      <Col style={styles.headerPadding} span={3}></Col>
      <Col span={2}></Col>
      <Col span={3}></Col>
      <Col span={2}></Col>
      <Col span={6} style={{ textAlign: "center", fontSize: 14 }}>
        UDPI Risk
      </Col>
      <Col span={2} style={{ fontSize: 14 }}>
        Mom. Bias
      </Col>
      <Col span={4} style={{ textAlign: "center", fontSize: 14 }}>
        Trend Confidence
      </Col>
      <Col span={2} style={{ fontSize: 14 }}>
        MDC
      </Col>
    </Row>
  );

  const headerRow = (
    <Row style={styles.headerRow}>
      <Col style={styles.headerPadding} span={3}>
        Asset
      </Col>
      <Col span={2}>Price (USD)</Col>
      <Col span={3}>Price (SATS)</Col>
      <Col span={2}>MCap</Col>
      <Col span={2}>Short</Col>
      <Col span={2}>Medium</Col>
      <Col span={2}>Long</Col>
      <Col span={2}>MBI</Col>
      <Col span={2}>TCI</Col>
      <Col span={2}>Crit Level</Col>
      <Col span={2}>Crit Level</Col>
    </Row>
  );
  const individualRow = () => {
    const rows: any = [];

    if (coinData !== null && coinData !== undefined) {
      const top25 = coinData.slice(0, 19);

      top25.forEach((coin: any, index: any) => {
        rows.push(
          <Row
            style={
              index % 2 === 0
                ? styles.individualRowEven
                : styles.individualRowOdd
            }
            // gutter={8}
            align="middle"
          >
            <Col span={1}>
              <img style={styles.coinImage} src={coin.image}></img>
            </Col>
            <Col span={2} style={styles.coinNameCol}>
              {coin.symbol.toUpperCase()}
            </Col>
            <Col span={2}>{coin.current_price}</Col>
            <Col span={3}>{coin.current_price}</Col>
            <Col span={2}>{coin.market_cap}</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
            <Col span={2}>1</Col>
          </Row>
        );
      });

      return rows;
    }
    return "test";
  };

  return (
    <div style={styles.tabledMainContainer}>
      {headerRowTop}
      {headerRow}
      {individualRow()}
    </div>
  );
};
