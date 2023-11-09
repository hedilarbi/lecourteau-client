import React from "react";
import { Text } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Fonts } from "../constants";
import { useNavigation } from "@react-navigation/native";

const NewsItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-64 mr-4 bg-gray-300 rounded-lg"
      onPress={() =>
        navigation.navigate("MenuNav", {
          screen: "Customize",
          params: { id: item._id },
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="flex-1 w-full rounded-lg"
      />
      <Text
        className="absolute bottom-3 left-5 text-white"
        style={{ fontFamily: Fonts.BEBAS_NEUE, fontSize: 24 }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default NewsItem;
