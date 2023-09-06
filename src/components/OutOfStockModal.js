import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants";

const OutOfStockModal = ({ setShowOutOfStockModal, showOutOfStockModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showOutOfStockModal}
      onRequestClose={() => setShowOutOfStockModal(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 20,
        }}
      >
        <View className="bg-white rounded-md p-3 items-center">
          <TouchableOpacity
            className="self-end"
            onPress={() => setShowOutOfStockModal(false)}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className=" py-3 mt-3">
            <Text
              style={{
                fontFamily: Fonts.LATO_REGULAR,
                fontSize: 14,
              }}
            >
              Sorry This Item Is Out Of Stock
            </Text>
            <View className="flex-row justify-center ">
              <TouchableOpacity
                className="bg-pr rounded-md py-2 items-center mt-4 px-8"
                onPress={() => setShowOutOfStockModal(false)}
              >
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OutOfStockModal;
