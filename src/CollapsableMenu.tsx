import { Menu } from "antd";

export const CollapsableMenu = () => {
  return (
    <Menu mode="inline" theme="dark">
      <Menu.SubMenu key="marketCap" title="Market Cap Analysis">
        <Menu.Item key="total"> Total Market Cap </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="marketSentiment" title="Market Sentiment Analysis">
        <Menu.Item key="btc"> Bitcoin Sentiment </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
