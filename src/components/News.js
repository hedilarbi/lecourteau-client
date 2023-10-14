import { View, Text } from "react-native";
import React, { memo } from "react";
import { Fonts, NewsItems } from "../constants";
import { FlatList } from "react-native";

import NewsItem from "./NewsItem";

const News = memo(({ text }) => {
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
          data={NewsItems}
          renderItem={({ item }) => <NewsItem item={item} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
});

export default News;
