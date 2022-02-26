import { InlineStylesModel } from "./models/InlineStyleModel";
import { StockOutlined } from "@ant-design/icons";

const styles: InlineStylesModel = {
  header: {
    height: "60px",
  },
  headerContainer: {
    width: "50vw",
    margin: "auto",
  },
};

export const Header = () => {
  return (
    <div style={styles.headerContainer}>
      <StockOutlined />
    </div>
  );
};
