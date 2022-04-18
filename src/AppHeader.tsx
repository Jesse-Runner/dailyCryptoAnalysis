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

export const AppHeader = () => {
  return (
    <div style={styles.headerContainer}>
      <StockOutlined />
    </div>
  );
};
