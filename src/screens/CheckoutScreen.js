import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import PickupMap from "../components/PickupMap";
import DeliveryMap from "../components/DeliveryMap";

import { Fonts } from "../constants";

const CheckoutScreen = () => {
  const [deliveryMode, setDeliveryMode] = useState("delivery");

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
      </View>
    </View>
  );
};

export default CheckoutScreen;
