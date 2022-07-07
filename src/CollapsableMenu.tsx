import {
  AppstoreOutlined,
  ContainerOutlined,
  DashboardOutlined,
  LineChartOutlined,
  MessageOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { InlineStylesModel } from "./models/InlineStyleModel";
import { Menu } from "antd";
import { MenuContext } from "./components/Common/menu-context";
import type { MenuProps } from "antd";
import { useContext } from "react";

const styles: InlineStylesModel = {
  mainMenuStyle: {
    width: 239,
    backgroundColor: "#0a0c12",
    color: "#64748b",
    borderRight: "none",
    fontSize: "16px",
    fontWeight: 500,
    paddingLeft: "25px",
    paddingTop: "20px",
  },
};

export const CollapsableMenu = () => {
  const { updateMenu } = useContext(MenuContext);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Dashboard", "dashboard", <AppstoreOutlined />),
    getItem("Risk", "risk", <DashboardOutlined />),
    getItem("Graphs", "graphs", <LineChartOutlined />),
    getItem("Articles", "4", <ReadOutlined />),
    getItem("Discord", "5", <MessageOutlined />),
  ];

  const onMenuClick = (value: any) => {
    updateMenu(value.key);
  };

  return (
    <Menu
      onClick={onMenuClick}
      style={styles.mainMenuStyle}
      defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
