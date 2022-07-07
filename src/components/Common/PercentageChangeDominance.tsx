import { Col, Row } from "antd";

import { InlineStylesModel } from "../../models/InlineStyleModel";

interface PercentageChangeProps {
  coin: any;
}

const styles: InlineStylesModel = {
  PercentageChangeHeader: {
    fontSize: 14,
    fontWeight: 400,
    color: "rgba(29,41,57,.5)",
  },
  PercentageChangeData: {
    fontSize: 14,
    fontWeight: 400,
  },
  percentageGreen: {
    color: "rgba(29,41,57,.5)",
  },
  percentageRed: {
    color: "rgba(29,41,57,.5)",
  },
};

export const PercentageChangeDominance = ({ coin }: PercentageChangeProps) => {
  return (
    <>
      <Row justify="space-between">
        <Col span={4} style={styles.PercentageChangeHeader}>
          {"24H"}
        </Col>
        <Col span={4} style={styles.PercentageChangeHeader}>
          {"7D"}
        </Col>
        <Col span={4} style={styles.PercentageChangeHeader}>
          {"30D"}
        </Col>
        <Col span={4} style={styles.PercentageChangeHeader}>
          {"1Y"}
        </Col>
        <Col span={4} style={styles.PercentageChangeHeader}>
          {"YTD"}
        </Col>
      </Row>
      <Row justify="space-between">
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_24h) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${coin.price_change_percentage_24h.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_7d_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_30d_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${coin.price_change_percentage_30d_in_currency.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_1y_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${coin.price_change_percentage_1y_in_currency.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_1y_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`N/A`}
        </Col>
      </Row>
    </>
  );
};
