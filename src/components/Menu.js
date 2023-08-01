import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import CategoriesItem from "./CategoriesItem";

const Menu = ({ categories }) => {
  return (
    <View className="h-40 mt-4">
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => <CategoriesItem item={item} />}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Menu;
