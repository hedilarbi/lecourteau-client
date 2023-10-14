import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { FlatList } from "react-native";
import CategoriesItem from "./CategoriesItem";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../constants";
import { AntDesign } from "@expo/vector-icons";

const Menu = memo(({ categories, text }) => {
  const navigation = useNavigation();
  return (
    <>
      <View className="mt-4 flex-row justify-between items-center">
        <View>
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
            {text.title}
          </Text>
          <View className="bg-pr h-0.5 w-8 "></View>
        </View>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate("MenuNav")}
        >
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-sm">
            {text.button}
          </Text>
          <AntDesign
            name="arrowright"
            size={20}
            color="black"
            className="ml-2"
          />
        </TouchableOpacity>
      </View>
      <View className="h-40 mt-4">
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => <CategoriesItem item={item} />}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
});

export default Menu;
