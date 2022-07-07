import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";

import { InlineStylesModel } from "../../models/InlineStyleModel";
import { MarketCapServicesType } from "../../models/MarketCapServicesType";
import { getDaysSinceYearBegan } from "../../common/sharedFunctions";
import { getTotalMarketCap } from "../../services/MarketCapService";

interface PercentageChangeProps {
  coin: any;
}

const styles: InlineStylesModel = {
  PercentageChangeHeader: {
    fontSize: 16,
    fontWeight: 400,
    color: "white",
  },
  percentageChangeData: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1,
  },
  percentageGreen: {
    color: "rgb(0,200,5)",
  },
  percentageRed: {
    color: "red",
  },
  test: {
    color: "rgba(164, 164, 164, 0.35)",
    backgroundColor: "rgba(164, 164, 164, 0.35)",
    height: "100%",
    marginRight: "10px",
    marginLeft: "10px",
  },
};

export const PercentageChangeMcap = ({ coin }: PercentageChangeProps) => {
  const [fetchData, setFetchData] = useState<MarketCapServicesType[] | null>(
    null
  );
  const [lastCoin, setLastCoin] = useState(coin.id);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketCapData = await getTotalMarketCap(coin.id, "max");
      setFetchData(marketCapData);
    };

    if (fetchData === null) {
      fetchMarketData();
    }
    if (lastCoin !== coin.id) {
      fetchMarketData();
      setLastCoin(coin.id);
    }
  }, [coin.id, fetchData, lastCoin]);

  const sevenDayChange =
    fetchData === null
      ? 0
      : ((coin.market_cap_real - fetchData[fetchData.length - 8].marketCap) /
          fetchData[fetchData.length - 8].marketCap) *
        100;

  const thirtyDayChange =
    fetchData === null
      ? 0
      : ((coin.market_cap_real - fetchData[fetchData.length - 31].marketCap) /
          fetchData[fetchData.length - 31].marketCap) *
        100;

  const oneYearChange =
    fetchData === null
      ? 0
      : ((coin.market_cap_real - fetchData[fetchData.length - 366].marketCap) /
          fetchData[fetchData.length - 366].marketCap) *
        100;

  const yearToDateLength = getDaysSinceYearBegan();

  const yearToDateChange =
    fetchData === null
      ? 0
      : ((coin.market_cap_real -
          fetchData[fetchData.length - yearToDateLength - 1].marketCap) /
          fetchData[fetchData.length - yearToDateLength - 1].marketCap) *
        100;

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
        <Col>
          <Divider style={styles.test} type="vertical" />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col
          span={4}
          style={
            Math.sign(coin.market_cap_change_percentage_24h) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${coin.market_cap_change_percentage_24h.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_7d_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${sevenDayChange.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_30d_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${thirtyDayChange.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_1y_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${oneYearChange.toFixed(2)}%`}
        </Col>
        <Col
          span={4}
          style={
            Math.sign(coin.price_change_percentage_1y_in_currency) === -1
              ? { ...styles.percentageRed, ...styles.percentageChangeData }
              : { ...styles.percentageGreen, ...styles.percentageChangeData }
          }
        >
          {`${yearToDateChange.toFixed(2)}%`}
        </Col>
        <Col>
          <Divider style={styles.test} type="vertical" />
        </Col>
      </Row>
    </>
  );
};
