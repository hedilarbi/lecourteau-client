import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OffersItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-64 mr-4 bg-gray-300 rounded-lg"
      onPress={() =>
        navigation.navigate("Offer", { id: item._id, parent: "Menu" })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="flex-1 w-full rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default OffersItem;
