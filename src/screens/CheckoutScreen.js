import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrder,
  setOrderTypeAndAddress,
} from "../redux/slices/orderSlide";

import PickupMap from "../components/PickupMap";
import DeliveryMap from "../components/DeliveryMap";
import { selectUserAddress } from "../redux/slices/userSlice";
import { Fonts } from "../constants";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [deliveryMode, setDeliveryMode] = useState("delivery");

  const { location } = useSelector(selectUserAddress);

  const confirmation = () => {
    dispatch(setOrderTypeAndAddress({ address: location }));
    navigation.navigate("Paiement");
  };

  return (
    <View className="flex-1 w-full">
      <View className="flex-row items-center ">
        <TouchableOpacity
          className={
            deliveryMode === "delivery"
              ? "justify-center items-center bg-pr py-3 flex-1 border-b border-black"
              : "justify-center items-center py-3 flex-1 border-b border-black"
          }
          onPress={() => setDeliveryMode("delivery")}
        >
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-base">
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            deliveryMode === "pickup"
              ? " justify-center items-center bg-pr py-3 flex-1 border-b border-black"
              : "justify-center items-center py-3 flex-1 border-b border-black "
          }
          onPress={() => setDeliveryMode("pickup")}
        >
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-base">
            Pick Up
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        {deliveryMode === "delivery" ? <DeliveryMap /> : <PickupMap />}
        <View
          className="bg-transparent rounded-md items-center justify-center px-3  absolute bottom-3 w-full"
          onPress={confirmation}
        >
          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-4  mt-4 w-full"
            onPress={confirmation}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
