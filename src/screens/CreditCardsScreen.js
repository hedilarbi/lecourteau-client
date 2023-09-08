import { View, Text } from "react-native";
import React from "react";
import { Fonts } from "../constants";

const CreditCardsScreen = () => {
  return (
    <View className="flex-1 bg-bg p-3">
      <View className="bg-white rounded-md justify-center items-center flex-1">
        <Text style={{ fontFamily: Fonts.LATO_BOLD }}>
          Aucune carte Engregistré
        </Text>
      </View>
    </View>
  );
};

export default CreditCardsScreen;
