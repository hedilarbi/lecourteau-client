import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants";

const Error = ({ setRefresh }) => {
  return (
    <View className="flex-1 justify-center items-center bg-bg">
      <View className="items-center">
        <MaterialIcons name="error" size={34} color="black" />
        <Text
          style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 18 }}
          className="text-tgry"
        >
          Oops!
        </Text>
        <Text
          style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          className="text-tgry"
        >
          Something Went Wrong
        </Text>
        <TouchableOpacity
          className="bg-pr rounded-md py-2 items-center flex-row  px-8  mt-3   "
          onPress={() => setRefresh((prev) => prev + 1)}
        >
          <AntDesign name="reload1" size={20} color="black" />
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            className="ml-2"
          >
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;
