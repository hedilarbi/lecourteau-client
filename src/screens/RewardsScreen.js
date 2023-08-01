import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants";
import { RewardList } from "../constants";
import { getRewards } from "../services/FoodServices";

const RewardsScreen = () => {
  const points = 1400;
  const addItemToBasket = (id) => {};
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    getRewards().then((response) => {
      if (response.status) {
        setRewards(response.data);
      }
    });
  }, []);

  return (
    <SafeAreaView className="bg-bg flex-1 p-3">
      <View className="flex-row justify-between bg-white rounded-md px-3 py-5">
        <Text className="text" style={{ fontFamily: Fonts.LATO_BOLD }}>
          Fidelity Points
        </Text>
        <Text
          className="text text-tgry"
          style={{ fontFamily: Fonts.LATO_REGULAR }}
        >
          {points} pt
        </Text>
      </View>
      <ScrollView className="flex-1 bg-white mt-5 mb-10 rounded-md p-3 space-y-8">
        {rewards.map((reward) => (
          <View
            key={reward._id}
            className="flex-row items-center justify-between"
          >
            <Text style={{ fontFamily: Fonts.LATO_REGULAR }} className="flex-1">
              {reward.item.name}
            </Text>
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-tgry mr-10"
            >
              {reward.points}
            </Text>
            <TouchableOpacity
              className={
                reward.points <= points
                  ? "bg-pr px-5 py-3"
                  : "bg-gray-400  px-5 py-3"
              }
              onPress={() => addItemToBasket(reward._id)}
              disabled={points <= reward.points}
            >
              <Text style={{ fontFamily: Fonts.LATO_REGULAR }}>Redeem</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;
