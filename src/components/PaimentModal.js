import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";
import { Dimensions } from "react-native";
import { Fonts } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import StripePaymentForm from "./StripePaymentForm";

const PaimentModal = ({ isModalVisible, setModalVisible, setCardDetails }) => {
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
          backgroundColor: "rgba(0, 0, 0, 0.4)",
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
          <View className="bg-white rounded-t-2xl ">
            <View className="px-3 my-3 flex-row items-center  justify-between ">
              <TouchableOpacity
                onPress={() => setModalVisible(false)} // Close the modal
              >
                <AntDesign name="close" size={28} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: Fonts.LATO_BOLD,
                  fontSize: 18,
                }}
              >
                Payment Details
              </Text>
              <View>
                <AntDesign name="close" size={28} color="white" />
              </View>
            </View>
          </View>

          <StripePaymentForm setCardDetails={setCardDetails} />
          {/* <View className="flex-1">
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
          </View> */}
          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-2  mx-2"
            onPress={selectCard}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaimentModal;
