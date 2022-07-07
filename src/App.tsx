import "./App.css";

import { AppHeader } from "./AppHeader";
import { CollapsableMenu } from "./CollapsableMenu";
import { InlineStylesModel } from "./models/InlineStyleModel";
import { Layout } from "antd";
import { MenuContextProvider } from "./components/Common/menu-context";
import { PageSelector } from "./components/PageSelector";
import { useState } from "react";

const styles: InlineStylesModel = {
  contentContainer: {
    height: "1650px",
    backgroundColor: "#0a0c12",
  },
  header: {
    height: "70px",
    width: "100vw",
    backgroundColor: "#0a0c12",
    borderBottom: "1px solid rgba(164,164,164,.35)",
    maxWidth: "100%",
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
