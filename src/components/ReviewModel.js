import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { Fonts } from "../constants/";
import { TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { reviewOrder } from "../services/OrderServices";
import { deleteItemAsync } from "expo-secure-store";
const ReviewModel = ({ modalVisible, setModalVisible, orderId, text }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const HandleSendReview = async () => {
    reviewOrder(orderId, comment, rating).then(async (response) => {
      if (response.status) {
        await deleteItemAsync("orderId");
        setModalVisible(false);
      } else {
        Alert.alert(response.message);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        className="flex-1 justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View
          className="m-6 bg-white rounded-3xl p-9 shadow-black"
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base">
            {text.title}
          </Text>
          <View className="flex-row space-x-2 my-2">
            {Array(5)
              .fill()
              .map((_, i) => {
                return (
                  <TouchableWithoutFeedback
                    key={i}
                    onPress={() => setRating(i + 1)}
                  >
                    <FontAwesome
                      name={i + 1 <= rating ? "star" : "star-o"}
                      size={32}
                      color="gold"
                      style={{ marginRight: 6 }}
                    />
                  </TouchableWithoutFeedback>
                );
              })}
          </View>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base ">
            {text.comment}
          </Text>
          <TextInput
            value={comment}
            className="py-2 text-base rounded-md bg-gray-100 px-2 my-2 "
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            placeholderTextColor="gray"
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            className="py-2 mt-4 bg-pr rounded-md"
            onPress={HandleSendReview}
          >
            <Text
              className="text-center  text-base"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              {text.send}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModel;
