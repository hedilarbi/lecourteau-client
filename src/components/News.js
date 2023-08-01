import { View, Text } from "react-native";
import React from "react";
import { NewsItems } from "../constants";
import { FlatList } from "react-native";

import NewsItem from "./NewsItem";

const News = () => {
  return (
    <View className="h-36 mt-4">
      <FlatList
        horizontal
        data={NewsItems}
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default News;
