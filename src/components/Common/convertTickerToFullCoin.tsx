export const convertTickerToFullCoin = (coin: string) => {
  switch (coin) {
    case "BTC":
      return "bitcoin";
    case "ETH":
      return "ethereum";
    case "USDT":
      return "tether";
    case "USDC":
      return "usdc";
    case "BNB":
      return "binance";
  }
};
