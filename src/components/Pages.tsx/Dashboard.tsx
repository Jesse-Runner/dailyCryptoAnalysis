import { InlineStylesModel } from "../../models/InlineStyleModel";

const styles: InlineStylesModel = {
  dashboardPageTitle: {
    fontSize: 30,
    fontWeight: 400,
    color: "white",
  },
  headerContainer: {
    padding: "20px 0px",
    width: "60vw",
    marginLeft: "calc(20vw - 239px)",
    // borderBottom: "1px solid rgba(164, 164, 164, 0.35)",
    marginBottom: "25px",
  },
};

export const Dashboard = () => {
  return (
    <>
      <h2 style={styles.headerContainer}>
        <div style={styles.dashboardPageTitle}>{"Dashboard"}</div>
      </h2>
      {/* <div>dashboard</div> */}
    </>
  );
};
