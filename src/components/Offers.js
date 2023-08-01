import { View, Text } from "react-native";
import React from "react";
import { OffersItems } from "../constants";

import OffersItem from "./OffersItem";
import { FlatList } from "react-native";

const Offers = ({ offers }) => {
  return (
    <View className="h-40 mt-4">
      <FlatList
        horizontal
        data={offers}
        renderItem={({ item }) => <OffersItem item={item} />}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Offers;
