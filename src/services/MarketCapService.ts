import axios, { AxiosRequestConfig } from "axios";

import { MarketCapServicesType } from "../models/MarketCapServicesType";
import { convertTickerToFullCoin } from "../components/Common/convertTickerToFullCoin";
import { timeStamp } from "console";

export const getTotalMarketCap = async (coin: string) => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=max&interval=daily`,
  };

  const response = await axios(axiosOptions);

  const formattedResponseObject = response.data.market_caps.map(
    (day: any[]) => ({
      timestamp: day[1],
      marketCap: day[0],
    })
  );

  console.log(formattedResponseObject);

  return response.data.market_caps;
};

export const fetchTop100Coins = async () => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`,
  };

  const response = await axios(axiosOptions);

  console.log("new response", response);
  return response;
};
