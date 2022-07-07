import "./App.css";

import { AppHeader } from "./AppHeader";
import { CollapsableMenu } from "./CollapsableMenu";
import { DescriptionTile } from "./DescriptionTile";
import { InlineStylesModel } from "./models/InlineStyleModel";
import { Layout } from "antd";
import { MarketCapChart } from "./MarketCapChart";
import { MarketSentimentChart } from "./MarketSentimentChart";
import { MenuContextProvider } from "./components/Common/menu-context";
import { PageSelector } from "./components/PageSelector";
import { useState } from "react";

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
    marginLeft: "calc(20vw - 239px)",
    // borderBottom: "1px solid rgba(164, 164, 164, 0.35)",
    marginBottom: "25px",
  },
  header: {
    height: "70px",
    width: "100vw",
    backgroundColor: "#0a0c12",
    borderBottom: "1px solid rgba(164,164,164,.35)",
  },
  sider: {
    borderRight: "1px solid rgba(164,164,164,.35)",
    backgroundColor: "#0a0c12",
  },
};

const { Header, Sider, Content } = Layout;

export const App = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const updateMenu = (menuOption: string) => {
    setSelectedMenu(menuOption);
  };

  return (
    <>
      <Layout>
        <Header style={styles.header}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width={240} style={styles.sider}>
            <MenuContextProvider
              value={{
                selectedMenu,
                updateMenu,
              }}
            >
              <CollapsableMenu />
            </MenuContextProvider>
          </Sider>
          <Content style={styles.contentContainer}>
            <PageSelector menuSelected={selectedMenu} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
