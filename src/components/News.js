import { View, Text } from "react-native";
import React, { memo } from "react";
import { Fonts } from "../constants";
import { FlatList } from "react-native";

import NewsItem from "./NewsItem";

const News = memo(({ text, items }) => {
  return (
    <>
      <View className="mt-4">
        <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
          {text.title}
        </Text>
        <View className="bg-pr h-0.5 w-8 "></View>
      </View>
      <View className="h-36 mt-4">
        <FlatList
          horizontal
          data={items}
          renderItem={({ item }) => <NewsItem item={item} />}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
});

export default News;
