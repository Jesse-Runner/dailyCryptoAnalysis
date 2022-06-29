import "./App.css";

import { AppHeader } from "./AppHeader";
import { CollapsableMenu } from "./CollapsableMenu";
import { DescriptionTile } from "./DescriptionTile";
import { InlineStylesModel } from "./models/InlineStyleModel";
import { Layout } from "antd";
import { MarketCapChart } from "./MarketCapChart";
import { MarketSentimentChart } from "./MarketSentimentChart";

const styles: InlineStylesModel = {
  contentContainer: {
    height: "1650px",
    // width: "60vw",
    // margin: "auto",
    backgroundColor: "#0a0c12",
  },
  graphPageTitle: {
    fontSize: 30,
    fontWeight: 400,
    color: "white",
  },
  headerContainer: {
    padding: "20px 0px",
    width: "60vw",
    margin: "auto",
    borderBottom: "1px solid rgba(164, 164, 164, 0.35)",
    marginBottom: "25px",
  },
};

const { Header, Footer, Sider, Content } = Layout;

export const App = () => {
  return (
    <>
      <Layout>
        <Header
          style={{
            height: "70px",
            width: "100vw",
            backgroundColor: "#0a0c12",
            borderBottom: "1px solid rgba(164,164,164,.35)",
          }}
        >
          <AppHeader />
        </Header>
        <Layout>
          <Sider
            width={240}
            style={{
              borderRight: "1px solid rgba(164,164,164,.35)",
              backgroundColor: "#0a0c12",
            }}
          >
            <CollapsableMenu />
          </Sider>
          <Content style={styles.contentContainer}>
            <h2 style={styles.headerContainer}>
              <div style={styles.graphPageTitle}>{"Graphs"}</div>
              <div></div>
            </h2>
            <MarketCapChart chartHeight={"650px"} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
