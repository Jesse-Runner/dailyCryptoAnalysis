import "./App.css";

import { DescriptionTile } from "./DescriptionTile";
import { Header } from "./Header";
import { MarketCapChart } from "./MarketCapChart";
import { MarketSentimentChart } from "./MarketSentimentChart";

export const App = () => {
  return (
    <>
      <div className="Header-container">
        <Header />
      </div>
      <div className="App-full-container">
        <div className="Chart-container">
          <div className="Chart-style">
            <MarketCapChart />
          </div>
        </div>
        <div className="Description-container">
          <DescriptionTile />
          <MarketSentimentChart />
        </div>
      </div>
    </>
  );
};
