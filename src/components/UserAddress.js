import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Fonts } from "../constants";
const UserAddress = ({ address }) => {
  return (
    <View className="bg-white rounded-md px-4 py-2 flex-row flex justify-between items-center ">
      <View>
        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base">
          Your current location
        </Text>
        <Text
          style={{ fontFamily: Fonts.LATO_REGULAR }}
          className="text-tgry text-sm"
        >
          {address}
        </Text>
      </View>
      <TouchableOpacity className="bg-pr p-1 justify-center items-center rounded-sm">
        <Entypo name="chevron-thin-down" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default UserAddress;
