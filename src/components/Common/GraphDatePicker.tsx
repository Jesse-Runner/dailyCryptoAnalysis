import { InlineStylesModel } from "../../models/InlineStyleModel";
import { Radio } from "antd";

const styles: InlineStylesModel = {
  mainContainer: {
    width: "100%",
  },
};

export const GraphDatePicker = () => {
  const options = [
    { label: "1D", value: "1D" },
    { label: "7D", value: "7D" },
    { label: "30D", value: "30D" },
    { label: "90D", value: "90D" },
    { label: "1Y", value: "1Y" },
    { label: "3Y", value: "3Y" },
    { label: "ALL", value: "ALL" },
  ];
  return (
    <Radio.Group
      style={styles.mainContainer}
      options={options}
      optionType="button"
    />
  );
};
