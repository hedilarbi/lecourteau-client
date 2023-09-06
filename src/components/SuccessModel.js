import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const SuccessModel = ({ visiblity }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visiblity}>
      <View
        style={{
          flex: 1,

          backgroundColor: "rgba(0, 0, 0, 0.4)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className="bg-pr rounded-md p-6 justify-center items-center">
          <AntDesign name="checkcircleo" size={80} color="black" />
        </View>
      </View>
    </Modal>
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
