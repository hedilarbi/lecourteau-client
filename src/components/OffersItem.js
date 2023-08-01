import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const OffersItem = ({ item }) => {
  return (
    <TouchableOpacity className="w-64 mr-4 bg-gray-300 rounded-lg">
      <Image
        source={{ uri: item.image }}
        className="flex-1 w-full rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default OffersItem;
