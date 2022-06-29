import {
  AppstoreOutlined,
  ContainerOutlined,
  DashboardOutlined,
  LineChartOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { InlineStylesModel } from "./models/InlineStyleModel";
import { Menu } from "antd";
import type { MenuProps } from "antd";

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
    getItem("Dashboard", "1", <AppstoreOutlined />),
    getItem("Risk", "2", <DashboardOutlined />),
    getItem("Graphs", "3", <LineChartOutlined />),
    getItem("Articles", "4", <ReadOutlined />),
    getItem("Discord", "5", <ContainerOutlined />),
  ];

  return (
    <Menu
      // onClick={onClick}
      style={styles.mainMenuStyle}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
