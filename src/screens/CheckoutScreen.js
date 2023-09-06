import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import PickupMap from "../components/PickupMap";
import DeliveryMap from "../components/DeliveryMap";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Fonts } from "../constants";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAddress } from "../redux/slices/userSlice";
import { Dimensions } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { selectSettings } from "../redux/slices/settingsSlice";
import { selectBasketTotal } from "../redux/slices/basketSlice";
import { Modal } from "react-native";
import { setOrderTypeAndAddress } from "../redux/slices/orderSlide";
import { useNavigation } from "@react-navigation/native";
import PaimentModal from "../components/PaimentModal";
import EditOrderModal from "../components/EditOrderModal";

const CheckoutScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const { location, address } = useSelector(selectUserAddress);

  const { delivery_fee } = useSelector(selectSettings);
  const subTotal = useSelector(selectBasketTotal);
  const total = delivery_fee + parseFloat(subTotal);
  const dispatch = useDispatch();
  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const navigation = useNavigation();

  const editOrder = () => {};

  const processOrder = () => {
    dispatch(
      setOrderTypeAndAddress({ type: deliveryMode, address, coords: location })
    );
    navigation.navigate("Process");
  };

  return (
    <View style={{ flex: 1, paddingBottom: 8 }}>
      <PaimentModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <EditOrderModal
        deliveryMode={deliveryMode}
        setDeliveryMode={setDeliveryMode}
        isDetailsModalVisible={isDetailsModalVisible}
        setIsDetailsModalVisible={setIsDetailsModalVisible}
        address={address}
      />
      <View style={{ height: Dimensions.get("window").height * 0.2 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
          <Marker
            coordinate={{
              latitude: location.latitude + 1,
              longitude: location.longitude,
            }}
          />
        </MapView>
      </View>

      <View style={{ flex: 1, marginTop: 12, paddingHorizontal: 8 }}>
        <View className="bg-white rounded-md p-3">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              Your Delivery
            </Text>
            <TouchableOpacity onPress={() => setIsDetailsModalVisible(true)}>
              <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
            }}
          >
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color="black"
            />
            <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
              30 - 45 mins
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
            }}
          >
            <MaterialIcons name="location-history" size={24} color="black" />
            <Text
              style={{
                fontFamily: Fonts.LATO_REGULAR,
                fontSize: 14,
              }}
              numberOfLines={1}
              className="w-3/4"
            >
              {address}
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-md p-3 mt-3">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            Your Order
          </Text>
          <View className="pt-2">
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
            <View className="flex-row justify-between my-1 border-b pb-1 border-gray-300">
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
            <View className="flex-row justify-between my-1 border-b pb-1 border-gray-300">
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
        </View>
        <View className="bg-white rounded-md mt-3 p-3">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="card" size={24} color="black" />
              <Text
                style={{
                  fontFamily: Fonts.LATO_BOLD,
                  fontSize: 18,
                  marginLeft: 8,
                }}
              >
                Paiement
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center "
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                select
              </Text>
              <Feather name="chevron-right" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="bg-pr rounded-md items-center justify-center py-2 mt-4 mx-2"
        onPress={processOrder}
      >
        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
          Process Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

{
  /* <View className="flex-row items-center ">
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
</View> */
}
