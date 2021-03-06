import { useEffect, useState } from "react";

import { InlineStylesModel } from "../../models/InlineStyleModel";
import { Radio } from "antd";
import { fetchPriceInformation } from "../../services/RiskChartService";

const styles: InlineStylesModel = {
  mainContainer: {
    width: "100%",
    backgroundColor: "rgb(22,24,29)",
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
      const priceData = await fetchPriceInformation("BTC", selectedOption);
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

    if (selectedData === null && selectedCoin !== null) {
      fetchPriceData();
    }

    let changeMade = false;
    let priceInformationCopy = priceInformation;
    const objectKeys = Object.keys(priceInformation);
    objectKeys.forEach((key) => {
      if (priceInformationCopy[key].isSelected && key !== selectedOption) {
        priceInformationCopy[key].isSelected = false;
        changeMade = true;
      } else if (
        !priceInformationCopy[key].isSelected &&
        key === selectedOption
      ) {
        priceInformationCopy[key].isSelected = true;
        changeMade = true;
      }
    });
    if (changeMade) {
      setPriceInformation({ ...priceInformationCopy });
    }
  }, [priceInformation, selectedCoin, selectedOption, setPriceInformation]);

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
