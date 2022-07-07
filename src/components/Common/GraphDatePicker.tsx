import { useEffect, useState } from "react";

import { InlineStylesModel } from "../../models/InlineStyleModel";
import { Radio } from "antd";
import { fetchPriceInformation } from "../../services/RiskChartService";

const styles: InlineStylesModel = {
  mainContainer: {
    width: "100%",
  },
};

export const GraphDatePicker = ({
  priceInformation,
  setPriceInformation,
  selectedCoin,
}: any) => {
  const [selectedOption, setSelectedOption] = useState("1D");
  const options = [
    { label: "1D", value: "1D" },
    { label: "7D", value: "7D" },
    { label: "1M", value: "1M" },
    { label: "1Y", value: "1Y" },
  ];

  useEffect(() => {
    const fetchPriceData = async () => {
      const priceData = await fetchPriceInformation(
        selectedCoin.symbol,
        selectedOption
      );
      const updatedCategory = { data: priceData, isSelected: true };
      const objectKeys = Object.keys(priceInformation);

      let priceInformationCopy = priceInformation;
      objectKeys.forEach((key) => {
        if (key === selectedOption) {
          priceInformationCopy[key] = updatedCategory;
        } else {
          priceInformationCopy[key] = {
            data: priceInformationCopy[key].data,
            isSelected: false,
          };
        }
      });

      console.log("setting new info", priceInformationCopy);
      setPriceInformation({ ...priceInformationCopy });
    };

    const selectedData = priceInformation[selectedOption].data;

    if (selectedData === null) {
      fetchPriceData();
    }
    // if (refetchApi) {
    //   fetchMarketData();
    //   setRefetchApi(false);
    // }
  }, [
    priceInformation,
    selectedCoin.symbol,
    selectedOption,
    setPriceInformation,
  ]);

  const onOptionChange = (option: any) => {
    setSelectedOption(option.target.value);
  };

  return (
    <Radio.Group
      defaultValue={selectedOption}
      onChange={onOptionChange}
      style={styles.mainContainer}
      options={options}
      optionType="button"
    />
  );
};
