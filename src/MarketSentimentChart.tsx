import { useEffect, useState } from "react";

import { getMarketSentiment } from "./services/MarketSentimentService";

export const MarketSentimentChart = () => {
  const [fetchData, setFetchData] = useState<null | string[][]>(null);

  useEffect(() => {
    const fetchMarketSentiment = async () => {
      const marketSentimentData = await getMarketSentiment();
      setFetchData(marketSentimentData);
    };

    if (fetchData === null) {
      fetchMarketSentiment();
    }
  }, [fetchData]);

  return <div>This is happening</div>;
};
