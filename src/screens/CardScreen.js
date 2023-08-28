import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../redux/slices/basketSlice";
import { Fonts } from "../constants";
import CardMenuItem from "../components/CardMenuItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../redux/slices/userSlice";
import { setOrder } from "../redux/slices/orderSlide";

import OfferCard from "../components/OfferCard";

import RewardCard from "../components/RewardCard";
import { selectSettings } from "../redux/slices/settingsSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import WarningModel from "../components/WarningModel";

const CardScreen = () => {
  const basket = useSelector(selectBasket);
  const { delivery_fee } = useSelector(selectSettings);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [instructions, setInstructions] = useState("");

  const subTotal = useSelector(selectBasketTotal);
  const total = delivery_fee + parseFloat(subTotal);
  const user = useSelector(selectUser);

  const [basketItems, setBasketItems] = useState([]);
  const [basketOffers, setBasketOffers] = useState([]);
  const [basketRewards, setBasketRewards] = useState([]);

  const [showWarningModel, setShowWarningModel] = useState(false);

  useEffect(() => {
    setBasketItems(basket.items);
    setBasketOffers(basket.offers);
    setBasketRewards(basket.rewards);
  }, [basket]);

  const checkout = () => {
    if (Object.keys(user).length === 0) {
      setShowWarningModel(true);
      return;
    }
    const orderItems = [];
    const orderOffers = [];
    const orderRewards = [];
    basketItems.map((item) => {
      const customizations = item.customization
        ? item.customization.map((customizationItem) => customizationItem._id)
        : [];

      orderItems.push({
        size: item.size,
        customizations,
        price: item.price,
        item: item.id,
      });
    });

    if (basketOffers.length > 0) {
      basketOffers.map((item) => orderOffers.push(item._id));
    }
    if (basketRewards.length > 0) {
      basketRewards.map((item) => orderRewards.push(item._id));
    }
    const order = {
      user_id: user._id,
      orderItems,
      subTotal,
      total,
      offers: basketOffers,
      rewards: basketRewards,
      deliveryFee: delivery_fee,
      instructions,
    };

    dispatch(setOrder(order));

    navigation.navigate("Checkout");
  };
  return (
    <SafeAreaView className="flex-1 bg-bg">
      {showWarningModel && (
        <WarningModel setShowWarningModel={setShowWarningModel} />
      )}
      <View className="px-3  py-3  flex-1 ">
        <View className="" style={{ height: "50%", width: "100%" }}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingVertical: 6,
            }}
          >
            {basketItems.length > 0 && (
              <View>
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry mb-2"
                >
                  Items
                </Text>
                {basketItems.map((item, index) => (
                  <CardMenuItem
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    customization={item.customization}
                    size={item.size}
                    uid={item.uid}
                    id={item.id}
                    key={index}
                  />
                ))}
              </View>
            )}
            {basketOffers.length > 0 && (
              <View>
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry mb-2"
                >
                  Offers
                </Text>
                {basketOffers.map((item, index) => (
                  <OfferCard
                    id={item._id}
                    key={item._id}
                    image={item.image}
                    price={item.price}
                    items={item.items}
                    name={item.name}
                  />
                ))}
              </View>
            )}
            {basketRewards.length > 0 && (
              <View>
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry mb-2"
                >
                  Rewards
                </Text>
                {basketRewards.map((item, index) => (
                  <RewardCard
                    id={item._id}
                    key={item._id}
                    points={item.points}
                    name={item.item.name}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
        <View className="flex-1">
          <View className="bg-white rounded-md mt-3 p-3 flex-row items-center">
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={24}
              color="#F7A600"
            />
            <TextInput
              placeholder="Add Delivery Instructions (Optional)"
              placeholderTextColor="#857878"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="ml-3 flex-1"
              onChangeText={(text) => {
                setInstructions(text);
              }}
            />
          </View>
        </View>
        <View className="bg-white p-3 rounded-md">
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-sm text-tgry"
            >
              Subtotal
            </Text>
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              {subTotal}$
            </Text>
          </View>
          <View className="flex-row justify-between my-3 border-b pb-3 border-gray-300">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-sm text-tgry"
            >
              Delivery
            </Text>
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              {delivery_fee}$
            </Text>
          </View>
          <View className="flex-row justify-between my-3 border-b pb-3 border-gray-300">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-sm text-tgry"
            >
              TVA
            </Text>
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              ????
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-sm text-tgry"
            >
              Total
            </Text>
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              {total.toFixed(2)}$
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-pr rounded-md items-center justify-center py-3    mt-4"
          onPress={checkout}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CardScreen;
