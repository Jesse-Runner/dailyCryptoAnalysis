import { InlineStylesModel } from "../../models/InlineStyleModel";
import { Select } from "antd";

const { Option, OptGroup } = Select;

const styles: InlineStylesModel = {
  selectOption: {
    color: "white",
    fontSize: "20px",
    marginBottom: "0em",
    fontWeight: 400,
  },
};
export const RiskMetricOptions = (
  <>
    <OptGroup style={styles.selectOption} label="Risk">
      <Option style={styles.selectOption} value="TCI">
        TCI
      </Option>
      <Option style={styles.selectOption} value="UDPI">
        UDPI
      </Option>
    </OptGroup>
    <Option style={styles.selectOption} value="Price">
      Price
    </Option>
  </>
);
