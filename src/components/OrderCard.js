import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../constants";

const OrderCard = ({ status, createdAt, total, id }) => {
  const navigation = useNavigation();
  let date = new Date(createdAt);
  date = date.toString("fr-FR", { month: "long" });
  date = date.substr(4, 17);

  return (
    <TouchableOpacity
      className="bg-white rounded-md p-4 mb-3"
      onPress={() => navigation.navigate("Details", { id: id })}
    >
      <View className="flex-row justify-between border-b border-gray-300 pb-4">
        <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
          {status}
        </Text>
        <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
          {date}
        </Text>
      </View>
      <View className="mt-4">
        <Text
          style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}
          className="text-txt"
        >
          {total} $
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
