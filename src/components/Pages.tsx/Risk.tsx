import { InlineStylesModel } from "../../models/InlineStyleModel";
import { RiskGraphs } from "./Risk/RiskGraphs";
import { RiskHeaderTile } from "./RiskHeaderTile";

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

export const Risk = ({ coinData }: any) => {
  return (
    <>
      <RiskHeaderTile coinData={coinData} />
      <RiskGraphs coinData={coinData} />
    </>
  );
};
