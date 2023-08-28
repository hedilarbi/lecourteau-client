import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../constants";
import { useSelector } from "react-redux";
import { selectSettings } from "../redux/slices/settingsSlice";

const WarningBanner = () => {
  const [message, setMessage] = useState("");
  const { open, delivery } = useSelector(selectSettings);
  useEffect(() => {
    if (!open) {
      setMessage("Restaurant Closed");
    } else if (!delivery) {
      setMessage("No Delivery ");
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#FF0707",
        alignItems: "center",
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14, color: "white" }}
      >
        {message}
      </Text>
    </View>
  );
};

export default WarningBanner;

const styles = StyleSheet.create({});
