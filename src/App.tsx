import "./App.css";

import { AppHeader } from "./AppHeader";
import { CollapsableMenu } from "./CollapsableMenu";
import { DescriptionTile } from "./DescriptionTile";
import { Layout } from "antd";
import { MarketCapChart } from "./MarketCapChart";
import { MarketSentimentChart } from "./MarketSentimentChart";

export const App = () => {
  return (
    <>
      {/* <div className="Header-container">
        <Header />
      </div>
      <div className="App-full-container">
        <div>
          <CollapsableMenu />
        </div>
        <div className="Chart-container">
          <div className="Chart-style">
            <MarketCapChart />
          </div>
        </div>
        <div className="Description-container">
          <DescriptionTile />
          <MarketSentimentChart />
        </div>
      </div> */}
      <Layout>
        <Layout.Header
          style={{
            height: "60px",
            width: "100vw",
            backgroundColor: "white",
            borderBottom: "2px solid rgba(91, 97, 110, 0.2)",
            borderRadius: "3px",
            boxShadow: "0 0 5px rgb(0 0 0 / 15%)",
          }}
        >
          <AppHeader />
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200}>
            <CollapsableMenu />
          </Layout.Sider>
          <Layout>
            <Layout.Content
              style={{
                height: "650px",
                backgroundColor: "white",
                border: "2px solid rgba(91, 97, 110, 0.2)",
                borderRadius: 3,
                boxShadow: "0 0 5px rgb(0 0 0 / 15%)",
                width: "50vw",
                margin: "auto",
              }}
            >
              <MarketCapChart />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
