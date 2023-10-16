import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants";
import { RewardList } from "../constants";
import { getRewards } from "../services/FoodServices";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromFidelityPoints,
  selectUser,
} from "../redux/slices/userSlice";
import { addRewardToBasket } from "../redux/slices/basketSlice";
import Error from "../components/Error";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";


const translation = {
  en: {
text:"Fidelity Points",
button:"Redeem"
  },
  fr: {
    text:"Points de fidélités",
    button:"Echanger"
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const RewardsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fidelity_points = user.fidelity_points || 0;
  const [rewards, setRewards] = useState([]);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    setErrors(false);
    getRewards()
      .then((response) => {
        if (response.status) {
          setRewards(response.data);
        } else {
          setErrors(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  const addToBasket = (reward) => {
    dispatch(addRewardToBasket(reward));
    dispatch(removeFromFidelityPoints(reward.points));
  };

  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-bg">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-bg flex-1 p-3">
      <View className="flex-row justify-between bg-white rounded-md px-3 py-5">
        <Text className="text" style={{ fontFamily: Fonts.LATO_BOLD }}>
         {i18n.t('text')}
        </Text>
        <Text
          className="text text-tgry"
          style={{ fontFamily: Fonts.LATO_REGULAR }}
        >
          {fidelity_points} points
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
                reward.points <= fidelity_points
                  ? "bg-pr px-5 py-3"
                  : "bg-gray-400  px-5 py-3"
              }
              onPress={() => addToBasket(reward)}
              disabled={reward.points > fidelity_points}
            >
              <Text style={{ fontFamily: Fonts.LATO_REGULAR }}>{i18n.t('button')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;
