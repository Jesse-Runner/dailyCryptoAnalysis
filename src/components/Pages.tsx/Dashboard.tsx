import { Col, Row } from "antd";
import { InlineStylesModel } from "../../models/InlineStyleModel";
import { DashboardChart } from "./Dashboard/DashboardChart";
import { DashboardTable } from "./Dashboard/DashboardTable";

const styles: InlineStylesModel = {
  chartSpacing: {
    marginTop: "2vh",
  },
  dashboardPageTitle: {
    fontSize: 30,
    fontWeight: 400,
    color: "white",
  },
  dashAndChartContainer: {},
  headerContainer: {
    padding: "20px 0px",
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
    // borderBottom: "1px solid rgba(164, 164, 164, 0.35)",
    marginBottom: "25px",
  },
  tableSpacing: {
    marginRight: "1vw",
  },
};

export const Dashboard = ({ coinData }: any) => {
  console.log("test", coinData);
  return (
    <Row style={styles.dashAndChartContainer}>
      {/* <h2 style={styles.headerContainer}>
        <div style={styles.dashboardPageTitle}>{"Dashboard"}</div>
      </h2> */}
      <div style={styles.tableSpacing}>
        <DashboardTable coinData={coinData} />
      </div>
      <Col>
        <div style={styles.chartSpacing}>
          <DashboardChart
            chartHeight="27vh"
            chartWidth="25vw"
            coinData={coinData}
          />
        </div>
        <div style={styles.chartSpacing}>
          <DashboardChart
            chartHeight="27vh"
            chartWidth="25vw"
            coinData={coinData}
          />
        </div>
      </Col>
    </Row>
  );
};
