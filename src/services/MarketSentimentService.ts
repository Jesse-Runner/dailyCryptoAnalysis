import axios, { AxiosRequestConfig } from "axios";
import * as CSV from 'csv-string';


import { MarketCapServicesType } from "../models/MarketCapServicesType";

export const getMarketSentiment = async () => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `https://uc5f9adf9775d0c0947250e07fc3.dl.dropboxusercontent.com/cd/0/inline/Bg5HLTQPkwjWkMX541TTlJTRnL7uvWW3vRGP-qp3oMHpR-b2LgFkvHsDyaEsln4sWx-9KZHu6e9nf7220ibwmdUx-5v4A6zmLOTzzZ6_ZlSIDfP-d5sqj9lWHqIm6LjoA51V4Fln-jKiVV6yAIIYdnl0/file#`,
  };

  const response = await axios(axiosOptions);

  const csvData = response.data;
  const parsedCsvData = CSV.parse(csvData);
  const bitcoinLongTerm = parsedCsvData.map((data) => data[2])

  console.log(bitcoinLongTerm);

  return parsedCsvData;
};