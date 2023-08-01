import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const NewsItem = ({ item }) => {
  return (
    <TouchableOpacity className="w-64 mr-4 bg-gray-300 rounded-lg">
      <Image
        source={{ uri: item.imageUrl }}
        className="flex-1 w-full rounded-lg"
      />
    </TouchableOpacity>
  );
};

export default NewsItem;
