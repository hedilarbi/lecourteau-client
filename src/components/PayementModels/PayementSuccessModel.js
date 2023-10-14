import { View, Text, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../../constants";

const PayementSuccessModel = ({ visiblity, text }) => {
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
        <View className="bg-pr rounded-md p-6 justify-center items-center flex-row">
          <AntDesign name="checkcircleo" size={30} color="black" />
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-lg ml-4"
          >
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default PayementSuccessModel;
