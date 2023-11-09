import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Fonts, OrderStatus } from "../constants";

const OrderCard = ({ status, createdAt, total, id }) => {
  const navigation = useNavigation();
  let date = new Date(createdAt);
  date = date.toString("fr-FR", { month: "long" });
  date = date.substr(4, 17);

  const handleOrderStatusColor = (status) => {
    switch (status) {
      case OrderStatus.READY:
        return "#2AB2DB";
      case OrderStatus.DONE:
        return "#2AB2DB";
      case OrderStatus.IN_DELIVERY:
        return "#2AB2DB";

      case OrderStatus.ON_GOING:
        return "#F3A32B";
      case OrderStatus.CANCELED:
        return "#FF0707";
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-md p-4 mb-3"
      onPress={() => navigation.navigate("Details", { id: id })}
    >
      <View className="flex-row justify-between border-b border-gray-300 pb-4">
        <Text
          style={{
            fontFamily: Fonts.LATO_BOLD,
            fontSize: 14,
            color: handleOrderStatusColor(status),
          }}
        >
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
