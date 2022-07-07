export const formatMarketCap = (marketCap: number) => {
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;

  // if market cap is greater than 1 million
  if (marketCap > million && marketCap < billion) {
    const shortenedValue = (marketCap / million).toFixed(3);
    return `${shortenedValue} M`;
  }

  // if market cap is greater than 1 billion
  if (marketCap > billion && marketCap < trillion) {
    const shortenedValue = (marketCap / billion).toFixed(3);
    return `${shortenedValue} B`;
  }

  // if market cap is greater than 1 trillion
  if (marketCap > trillion) {
    const shortenedValue = (marketCap / trillion).toFixed(3);
    return `${shortenedValue} T`;
  }
};

export const formatDate = (date: string) => {
  // the date is coming in through the format Sun Apr 22 2012
  // and we want it to read Apr 22 2012, so this function removes
  // the day of the week from the front of the date string
  const dateWithoutDay = date.substring(date.indexOf(" "), date.length);
  return dateWithoutDay;
};

export const getDaysSinceYearBegan = () => {
  const date = new Date();
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};
