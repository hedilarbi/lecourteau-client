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

import { restaurantOpenStatus } from "../utils/restaurantOpenStatus";
import RestaurantCloseModal from "../components/RestaurantCloseModal";

const CardScreen = () => {
  const basket = useSelector(selectBasket);

  const { delivery_fee, working_hours, delivery } = useSelector(selectSettings);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [instructions, setInstructions] = useState("");

  const subTotal = useSelector(selectBasketTotal);
  const total = parseFloat(subTotal);
  const user = useSelector(selectUser);

  const [basketItems, setBasketItems] = useState([]);
  const [basketOffers, setBasketOffers] = useState([]);
  const [basketRewards, setBasketRewards] = useState([]);
  const [showRestaurantCloseModal, setShowRestaurantCloseModal] =
    useState(false);

  const [showWarningModel, setShowWarningModel] = useState(false);

  useEffect(() => {
    setBasketItems(basket.items);
    setBasketOffers(basket.offers);
    setBasketRewards(basket.rewards);
  }, [basket]);

  const checkout = () => {
    const isRestaurantOpen = restaurantOpenStatus(working_hours);
    if (isRestaurantOpen && delivery) {
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
        basketOffers.map((item) => {
          const customizations = item.customizations
            ? item.customizations.map(
                (customizationItem) => customizationItem._id
              )
            : [];

          orderOffers.push({
            customizations,
            price: item.price,
            offer: item.id,
          });
        });
      }
      if (basketRewards.length > 0) {
        basketRewards.map((item) => orderRewards.push(item._id));
      }
      const order = {
        user_id: user._id,
        orderItems,
        subTotal,
        total,
        offers: orderOffers,
        rewards: orderRewards,
        deliveryFee: delivery_fee,
        instructions,
      };

      dispatch(setOrder(order));

      navigation.navigate("Checkout");
    } else {
      setShowRestaurantCloseModal(true);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <WarningModel
        setShowWarningModel={setShowWarningModel}
        showWarningModel={showWarningModel}
      />
      <RestaurantCloseModal
        showRestaurantCloseModal={showRestaurantCloseModal}
        setShowRestaurantCloseModal={setShowRestaurantCloseModal}
      />
      {(basketItems?.length ||
        basketOffers.length > 0 ||
        basketRewards?.length > 0) > 0 ? (
        <View className="px-3  py-3  flex-1 ">
          <View className="" style={{ height: "70%", width: "100%" }}>
            <ScrollView
              className="flex-1"
              contentContainerStyle={{
                paddingVertical: 6,
              }}
            >
              {basketItems?.length > 0 && (
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
              {basketOffers?.length > 0 && (
                <View>
                  <Text
                    style={{ fontFamily: Fonts.LATO_REGULAR }}
                    className="text-sm text-tgry mb-2"
                  >
                    Offers
                  </Text>
                  {basketOffers.map((item, index) => (
                    <OfferCard
                      id={item.id}
                      uid={item.uid}
                      key={item.uid}
                      image={item.image}
                      price={item.price}
                      items={item.items}
                      name={item.name}
                      customizations={item.customizations}
                    />
                  ))}
                </View>
              )}
              {basketRewards?.length > 0 && (
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
                Total
              </Text>
              <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
                {total.toFixed(2)}$
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-2  mt-4"
            onPress={checkout}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 bg-bg justify-center items-center rounded-md">
          <View className="items-center">
            <MaterialCommunityIcons
              name="basket-remove"
              size={36}
              color="#F7A600"
            />
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD }}
              className="text-xs mt-2"
            >
              Basket Empty
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Menu")}
              className="bg-pr py-2 px-5 rounded-sm mt-2"
            >
              <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-xs">
                Go To Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CardScreen;
