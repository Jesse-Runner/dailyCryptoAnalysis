import axios, { AxiosRequestConfig } from "axios";

export const getTotalMarketCap = async (coin: string, days: string) => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
  };

  const response = await axios(axiosOptions);

  const formattedResponseObject = response.data.market_caps.map(
    (day: any[]) => ({
      timestamp: day[0],
      marketCap: day[1],
    })
  );

  return response.data.market_caps;
};

export const fetchTop100Coins = async () => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h%2C7d%2C30d%2C1y`,
  };

  const response = await axios(axiosOptions);

  const cleanedData = response.data.map((coin: any) => {
    const formattedPrice = coin.current_price
      .toLocaleString("en-us")
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const formattedMCap = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(coin.market_cap);

    const formattedCircSupply = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    }).format(coin.circulating_supply);

    const formattedMaxSupply = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    }).format(coin.max_supply);

    const cleanedObject = {
      current_price: "$" + formattedPrice,
      market_cap: formattedMCap,
      market_cap_real: coin.market_cap,
      formattedCircSupply: formattedCircSupply,
      formattedMaxSupply: formattedMaxSupply,
    };

    return { ...coin, ...cleanedObject };
  });

  return cleanedData;
};

export const fetchGlobalData = async (coinId: string) => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://api.nomics.com/v1/currencies/ticker?key=cc8e0520b19c8633dd74c8e2426189b42a92abbd&ids=${coinId.toUpperCase()}`,
  };

  const response = await axios(axiosOptions);

  const marketCapDominance = response.data[0].market_cap_dominance * 100;
  return marketCapDominance;
};

export const test = async () => {
  const response = await fetch(
    "https://www.dropbox.com/s/6way5dkvqd4koyd/Graphing_Data.csv?raw=1",
    {
      redirect: "follow",
      mode: "cors",
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log("in error case");
      console.log(err);
    });

  // const marketCapDominance = response.data[0].market_cap_dominance * 100;
  return "test";
};
