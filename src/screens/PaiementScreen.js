import { View, Text } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native";
import { Fonts } from "../constants";

import { useNavigation } from "@react-navigation/native";

const PaiementScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-pr rounded-md items-center justify-center py-4  mt-4 w-full"
      onPress={() => navigation.navigate("Process")}
    >
      <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
        Process Order
      </Text>
    </TouchableOpacity>
  );
};

export default PaiementScreen;
