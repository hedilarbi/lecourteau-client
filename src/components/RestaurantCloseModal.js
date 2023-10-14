import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants";

const RestaurantCloseModal = ({
  showRestaurantCloseModal,
  setShowRestaurantCloseModal,
  text,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRestaurantCloseModal}
      onRequestClose={() => setShowRestaurantCloseModal(false)}
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
            onPress={() => setShowRestaurantCloseModal(false)}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className=" py-3 mt-3">
            <Text
              style={{
                fontFamily: Fonts.LATO_REGULAR,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {text.warning}
            </Text>
            <View className="flex-row justify-center ">
              <TouchableOpacity
                className="bg-pr rounded-md py-2 items-center mt-4 px-8"
                onPress={() => setShowRestaurantCloseModal(false)}
              >
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  {text.button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RestaurantCloseModal;
