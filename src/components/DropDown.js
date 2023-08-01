import { StyleSheet } from "react-native";
import React, { useState } from "react";

import { Dropdown } from "react-native-element-dropdown";
import { Fonts } from "../constants";

const DropDown = ({ sizes, setSize, size }) => {
  const [isFocus, setIsFocus] = useState(false);

  const data = sizes.map((item, index) => ({ value: index, label: item }));

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      selectedStyle={styles.selectedStyle}
      itemContainerStyle={styles.itemContainerStyle}
      itemTextStyle={styles.itemTextStyle}
      containerStyle={styles.containerStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="label"
      placeholder={"Medium"}
      value={size}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setSize(item.label);
        setIsFocus(false);
      }}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 22,
    width: 100,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  selectedStyle: {
    height: 10,
  },
  icon: {
    marginRight: 5,
  },
  itemContainerStyle: {
    padding: 0,
    margin: 0,
  },
  itemTextStyle: {
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
  containerStyle: {
    paddingHorizontal: 0,
    margin: 0,
  },

  placeholderStyle: {
    fontSize: 12,
    fontFamily: Fonts.LATO_REGULAR,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: Fonts.LATO_REGULAR,
  },
});
