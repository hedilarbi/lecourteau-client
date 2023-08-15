import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Fonts } from "../constants";
import { AntDesign } from "@expo/vector-icons";

import OffersItem from "./OffersItem";
import { FlatList } from "react-native";

const Offers = memo(({ offers }) => {
  return (
    <>
      <View className="mt-4 flex-row justify-between items-center">
        <View>
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
            top offers
          </Text>
          <View className="bg-pr h-0.5 w-8 "></View>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-sm">
            view all
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
          data={offers}
          renderItem={({ item }) => <OffersItem item={item} />}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
});

export default Offers;
