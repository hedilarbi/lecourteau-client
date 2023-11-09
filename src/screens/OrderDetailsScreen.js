import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getOrder } from "../services/OrderServices";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";

import { Fonts, OrderStatus } from "../constants";
import Error from "../components/Error";
import { convertDate } from "../utils/dateHandlers";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    status: "Status",
    address: "Address",
    items: "Items",
    offers: "Offers",
    rewards: "Rewards",
    subtotale: "Subtotale",
    delivery: "Delivery",
    total: "Total",
  },
  fr: {
    status: "Etat",
    address: "Adresse",
    items: "Articles",
    offers: "Offers",
    rewards: "Rewards",
    subtotale: "Sous-total",
    delivery: "Livraison",
    total: "Totale",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const OrderDetailsScreen = () => {
  const route = useRoute();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);

  const fetchData = async () => {
    setErrors(false);
    setIsLoading(true);
    getOrder(id)
      .then((response) => {
        if (response.status) {
          setOrder(response.data);
        } else {
          setErrors(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleOrderStatusColor = (status) => {
    switch (status) {
      case OrderStatus.READY:
        return "#2AB2DB";
      case OrderStatus.DONE:
        return "#2AB2DB";
      case OrderStatus.IN_DELIVERY:
        return "#2AB2DB";

      case OrderStatus.ON_GOING:
        return "#F3A32B";
      case OrderStatus.CANCELED:
        return "#FF0707";
    }
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }
  return (
    <ScrollView className="flex-1 p-3 bg-bg">
      <View className="bg-white p-4 rounded-md mt-3">
        <View className="flex-row ">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Code:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {order.code}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            {i18n.t("status")}:
          </Text>
          <Text
            className="ml-3"
            style={{
              fontFamily: Fonts.LATO_REGULAR,
              fontSize: 14,
              color: handleOrderStatusColor(order.status),
            }}
          >
            {order.status}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Date:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {convertDate(order.createdAt)}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Type:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {order.type}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            {i18n.t("address")}:
          </Text>
          <Text
            className="ml-3 w-3/4"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            numberOfLines={2}
          >
            {order.address}
          </Text>
        </View>
      </View>
      <Text
        style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}
        className="mt-3"
      >
        {i18n.t("items")}
      </Text>
      <View className="bg-white rounded-md p-4 mt-3 ">
        {order.orderItems.map((item, index) => (
          <View
            key={item._id}
            className={
              index != order.orderItems.length - 1 &&
              "border-b border-gray-300 mb-2 pb-2"
            }
          >
            <View className="flex-row justify-between">
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                className="w-2/5"
                numberOfLines={1}
              >
                {item.item.name}
              </Text>
              <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
                {item.size}
              </Text>
              <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
                {item.price}$
              </Text>
            </View>
          </View>
        ))}
      </View>
      {order.offers.length > 0 && (
        <>
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            {i18n.t("offers")}
          </Text>
          <View className="bg-white rounded-md p-2 mt-3 border-gray-300 space-y-2">
            {order.offers.map((item, index) => (
              <View
                key={item._id}
                className={
                  index != order.orderItems.length - 1 &&
                  "border-b border-gray-300"
                }
              >
                <View className="flex-row justify-between">
                  <Text
                    style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                    className="w-1/3"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  >
                    {item.price} $
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
      {order.rewards.length > 0 && (
        <>
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            {i18n.t("rewards")}
          </Text>
          <View className="bg-white rounded-md p-2 mt-3  space-y-2">
            {order.rewards.map((item, index) => (
              <View
                key={item._id}
                className={
                  index != order.orderItems.length - 1 &&
                  "border-b border-gray-300"
                }
              >
                <View className="flex-row ">
                  <Text
                    style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
      {order.insctructions && (
        <>
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            Instructions
          </Text>
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            className="bg-white rounded-md py-1 px-1"
          >
            {order.insctructions}
          </Text>
        </>
      )}
      <View className="bg-white p-4 rounded-md mt-3 ">
        <View className="flex-row justify-between border-b border-gray-300 pb-3">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            {i18n.t("subtotale")}
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.sub_total}$
          </Text>
        </View>
        <View className="flex-row justify-between my-1 border-b pb-3 border-gray-300">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            {i18n.t("delivery")}
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.delivery_fee}$
          </Text>
        </View>
        <View className="flex-row justify-between my-1 border-b pb-3 border-gray-300">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            TPS
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {((order.sub_total * 5) / 100).toFixed(2)}$
          </Text>
        </View>
        <View className="flex-row justify-between my-1 border-b pb-3 border-gray-300">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            TVQ
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {((order.sub_total * 9.975) / 100).toFixed(2)}$
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            {i18n.t("total")}
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.total_price.toFixed(2)}$
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity className="">
        <Text>Cancel</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default OrderDetailsScreen;
