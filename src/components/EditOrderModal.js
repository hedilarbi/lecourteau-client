import { View, Text } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Fonts } from "../constants";

const EditOrderModal = ({
  deliveryMode,
  setDeliveryMode,
  isDetailsModalVisible,
  setIsDetailsModalVisible,
  address,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDetailsModalVisible}
      onRequestClose={() => setIsDetailsModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: Dimensions.get("window").height * 0.9, // Half of the screen height
          }}
          className="bg-bg pb-3"
        >
          <View className="bg-white rounded-t-2xl ">
            <View className="px-3 mt-3 flex-row items-center  justify-between ">
              <TouchableOpacity
                onPress={() => setIsDetailsModalVisible(false)}
                // Close the modal
              >
                <AntDesign name="close" size={28} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: Fonts.LATO_BOLD,
                  fontSize: 18,
                }}
              >
                Order Details
              </Text>
              <View>
                <AntDesign name="close" size={28} color="white" />
              </View>
            </View>

            <View className="flex-row items-center  mt-3">
              <TouchableOpacity
                className={
                  deliveryMode === "delivery"
                    ? "justify-center items-center bg-pr py-2 flex-1 border-b border-t border-l border-black"
                    : "justify-center items-center py-2 flex-1 border-b border-t border-l border-black"
                }
                onPress={() => setDeliveryMode("delivery")}
              >
                <Text
                  style={{ fontFamily: Fonts.BEBAS_NEUE }}
                  className="text-base"
                >
                  Delivery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={
                  deliveryMode === "pickup"
                    ? " justify-center items-center bg-pr py-2 flex-1 border border-black"
                    : "justify-center items-center py-2 flex-1 border border-black "
                }
                onPress={() => setDeliveryMode("pickup")}
              >
                <Text
                  style={{ fontFamily: Fonts.BEBAS_NEUE }}
                  className="text-base"
                >
                  Pick Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1">
            <Text
              className="text-sm px-3 my-3"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              Select Address
            </Text>
            <View className="bg-white px-3 pb-3">
              <TouchableOpacity className=" flex-row justify-between items-center border-b border-gray-300 py-2 mt-2">
                <Text
                  style={{
                    fontFamily: Fonts.LATO_REGULAR,
                    fontSize: 14,
                  }}
                >
                  Add new Address
                </Text>
                <Entypo name="plus" size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className=" flex-row justify-between items-center  border-gray-300 py-2 mt-2 ">
                <Text
                  style={{
                    fontFamily: Fonts.LATO_REGULAR,
                    fontSize: 14,
                    width: "80%",
                  }}
                  numberOfLines={1}
                >
                  {address}
                </Text>
                <View className="h-4 w-4 rounded-full border-pr border  justify-center items-center">
                  <View className="bg-pr h-2 w-2 rounded-full  "></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-2  mx-2"
            onPress={() => setIsDetailsModalVisible(false)}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditOrderModal;
