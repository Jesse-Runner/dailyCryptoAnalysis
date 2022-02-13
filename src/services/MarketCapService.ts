import axios, { AxiosRequestConfig } from "axios";

import { MarketCapServicesType } from "../models/MarketCapServicesType";

export const getTotalMarketCap = async () => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.nomics.com/v1/market-cap/history?start=2010-01-01T00%3A00%3A00Z&key=c56c4df49811cfd7d37f3a713b54b6f14d9ba2fe`,
  };

  const response = await axios(axiosOptions);

  const formattedResponseObject: MarketCapServicesType[] = response.data.map(
    (day: MarketCapServicesType, index: number) => ({
      x: index,
      y: parseInt(day.market_cap),
    })
  );

  return formattedResponseObject;
};
