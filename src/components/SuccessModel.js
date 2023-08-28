import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const SuccessModel = () => {
  return (
    <View style={styles.container}>
      <View className="bg-pr rounded-md p-6 justify-center items-center">
        <AntDesign name="checkcircleo" size={80} color="black" />
      </View>
    </View>
  );
};

export default SuccessModel;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(50,44,44,0.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});
