import axios, { AxiosRequestConfig } from "axios";

export const fetchPriceInformation = async (coin: string, interval: string) => {
  let url = "";

  if (interval === "1D") {
    url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${coin.toUpperCase()}&tsym=USD&limit=1440`;
  } else if (interval === "7D") {
    url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coin.toUpperCase()}&tsym=USD&limit=168`;
  } else if (interval === "1M") {
    url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coin.toUpperCase()}&tsym=USD&limit=720`;
  }

  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: url,
  };

  const response = await axios(axiosOptions);

  return response.data.Data.Data;
};
