import { View, Text, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../../constants";

const PayementFailedModel = ({ visiblity, message, text }) => {
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
        <View className="bg-red-500 rounded-md p-6 justify-center items-center flex-row">
          <AntDesign name="close" size={30} color="white" />
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-lg text-white ml-4 flex-wrap"
          >
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default PayementFailedModel;
