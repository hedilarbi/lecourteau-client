import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "../constants";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeRewardFromBasket } from "../redux/slices/basketSlice";
import { addToFidelityPoints } from "../redux/slices/userSlice";

const RewardCard = ({
  name,
  id,

  points,
}) => {
  const dispatch = useDispatch();

  const deleteItemFromCard = () => {
    dispatch(removeRewardFromBasket({ id }));
    dispatch(addToFidelityPoints(points));
  };
  return (
    <View className=" bg-white rounded-md px-3 py-2 mb-3">
      <View className=" flex-row items-center justify-between">
        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
          {name}
        </Text>

        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm ">
          {points}
        </Text>
        <TouchableOpacity onPress={deleteItemFromCard}>
          <Feather name="trash-2" size={20} color="#E34242" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RewardCard;
