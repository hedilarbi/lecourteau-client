import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";
import { Dimensions } from "react-native";
import { Fonts } from "../constants";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const PaimentModal = ({ isModalVisible, setModalVisible }) => {
  const selectCard = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
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
            height: Dimensions.get("window").height * 0.4, // Half of the screen height
          }}
          className="bg-bg pb-3"
        >
          <View className="bg-white rounded-t-2xl p-3">
            <TouchableOpacity
              onPress={() => setModalVisible(false)} // Close the modal
            >
              <AntDesign name="close" size={28} color="black" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD,
                fontSize: 18,
                marginTop: 12,
              }}
            >
              Select payment card
            </Text>
          </View>

          <View className="flex-1">
            <TouchableOpacity className="bg-white px-3 flex-row justify-between items-center mt-2 py-3">
              <Text
                style={{
                  fontFamily: Fonts.LATO_REGULAR,
                  fontSize: 14,
                }}
              >
                Use new card
              </Text>
              <Entypo name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-2  mx-2"
            onPress={selectCard}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              Select
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaimentModal;
