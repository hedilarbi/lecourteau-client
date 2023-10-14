import { Text } from "react-native";
import React from "react";
import { Fonts } from "../constants";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CategoriesItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-36 mr-4 bg-white rounded-lg"
      onPress={() =>
        navigation.navigate("MenuNav", {
          screen: "Menu",
          params: { category: item.name },
        })
      }
    >
      <Text
        style={{ fontFamily: Fonts.BEBAS_NEUE }}
        className="text-base mx-auto py-1"
      >
        {item.name}
      </Text>
      <Image
        source={{ uri: item.image }}
        className="flex-1 w-full rounded-b-lg "
      />
    </TouchableOpacity>
  );
};

export default CategoriesItem;
