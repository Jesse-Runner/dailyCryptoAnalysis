import { Col, Row } from "antd";
import { InlineStylesModel } from "../../../models/InlineStyleModel";

const styles: InlineStylesModel = {
  coinImage: {
    height: 25,
    width: 25,
  },
  headerRow: {
    color: "white",
    marginLeft: ".5vw",
  },
  individualRow: {
    color: "white",
    marginLeft: ".5vw",
  },
  tabledMainContainer: {
    border: ".5px solid rgba(164,164,164,.35)",
    width: "40vw",
    marginLeft: "calc(20vw - 239px)",
  },
};

export const DashboardTable = ({ coinData }: any) => {
  const headerRow = (
    <Row style={styles.headerRow}>
      <Col span={4}>Asset</Col>
      <Col span={3}>Price (USD)</Col>
      <Col span={3}>Price (SATS)</Col>
      <Col span={3}>Market Cap</Col>
      <Col span={3}>Mock one</Col>
      <Col span={3}>Mock two</Col>
      <Col span={3}>Mock Three</Col>
    </Row>
  );
  const individualRow = () => {
    const rows: any = [];

    if (coinData !== null && coinData !== undefined) {
      const top25 = coinData.slice(0, 24);

      top25.forEach((coin: any) => {
        rows.push(
          <Row style={styles.individualRow} gutter={8}>
            <Col span={2}>
              <img style={styles.coinImage} src={coin.image}></img>
            </Col>
            <Col span={2}>{coin.symbol.toUpperCase()}</Col>
            <Col span={3}>{coin.current_price}</Col>
            <Col span={3}>{coin.current_price}</Col>
            <Col span={3}>{coin.market_cap}</Col>
            <Col span={3}>{coin.market_cap}</Col>
            <Col span={3}>{coin.market_cap}</Col>
            <Col span={3}>{coin.market_cap}</Col>
          </Row>
        );
      });

      return rows;
    }
    return "test";
  };

  return (
    <div style={styles.tabledMainContainer}>
      {headerRow}
      {individualRow()}
    </div>
  );
};
