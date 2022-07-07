import { Col, Row } from "antd";

import { InlineStylesModel } from "../../../models/InlineStyleModel";
import { RiskChart } from "./RiskChart";

const styles: InlineStylesModel = {
  dashboardPageTitle: {
    fontSize: 30,
    fontWeight: 400,
    color: "white",
  },
  graphsRow: {
    marginTop: "3vh",
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
  },
};

export const RiskGraphs = ({ coinData }: any) => {
  console.log("hello", coinData);
  return (
    <>
      <Row style={styles.graphsRow} justify="space-between">
        <Col>
          <RiskChart
            chartHeight={"30vh"}
            chartWidth={"28vw"}
            coinData={coinData}
          />
        </Col>
        <Col>
          <RiskChart
            chartHeight={"30vh"}
            chartWidth={"28vw"}
            coinData={coinData}
          />
        </Col>
      </Row>
      <Row style={styles.graphsRow} justify="space-between">
        <Col>
          <RiskChart
            chartHeight={"30vh"}
            chartWidth={"28vw"}
            coinData={coinData}
          />
        </Col>
        <Col>
          <RiskChart
            chartHeight={"30vh"}
            chartWidth={"28vw"}
            coinData={coinData}
          />
        </Col>
      </Row>
    </>
  );
};
