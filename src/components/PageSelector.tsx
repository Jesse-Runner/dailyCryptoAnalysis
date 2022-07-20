import { useEffect, useState } from "react";

import { Dashboard } from "./Pages.tsx/Dashboard";
import { MarketCapChart } from "../MarketCapChart";
import { Risk } from "./Pages.tsx/Risk";
import { RiskChart } from "./Pages.tsx/Risk/RiskChart";
import { fetchTop100Coins } from "../services/MarketCapService";

interface PageSelectorProps {
  menuSelected: string;
}

export const PageSelector = ({ menuSelected }: PageSelectorProps) => {
  const [top100Coins, setTop100Coins] = useState<any>(null);

  useEffect(() => {
    const getTop100Coins = async () => {
      const coinData = await fetchTop100Coins();
      setTop100Coins(coinData);
    };

    if (top100Coins === null) {
      getTop100Coins();
    }
  }, [top100Coins]);

  const pageInView = () => {
    switch (menuSelected) {
      case "dashboard":
        return <Dashboard coinData={top100Coins} />;
      case "risk":
        return <Risk coinData={top100Coins} />;
      case "graphs":
        return (
          <RiskChart
            chartWidth={"40vw"}
            coinData={top100Coins}
            chartHeight={"650px"}
          />
        );
      default:
        return <div>default</div>;
    }
  };

  return pageInView();
};
