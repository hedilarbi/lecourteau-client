import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getOrder } from "../services/OrderServices";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Fonts } from "../constants";
import Error from "../components/Error";

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
      <View className="bg-white p-2 rounded-md mt-3">
        <View className="flex-row ">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Name:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {order.user.name}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Phone Number:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {order.user.phone_number}
          </Text>
        </View>
        <View className="flex-row  mt-2">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            address:
          </Text>
          <Text
            className="ml-3"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {order.address}
          </Text>
        </View>
      </View>
      <Text
        style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}
        className="mt-3"
      >
        Items
      </Text>
      <View className="bg-white rounded-md p-2 mt-3">
        {order.orderItems.map((item, index) => (
          <View
            key={item._id}
            className={
              index != order.orderItems.length - 1 && "border-b border-gray-300"
            }
          >
            <View className="flex-row justify-between">
              <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
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
            Offers
          </Text>
          <View className="bg-white rounded-md p-2 mt-3 border-gray-300">
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
            Rewards
          </Text>
          <View className="bg-white rounded-md p-2 mt-3">
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
      <View className="bg-white p-2 rounded-md mt-3">
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            Subtotal
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.sub_total}$
          </Text>
        </View>
        <View className="flex-row justify-between my-3 border-b pb-3 border-gray-300">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            Delivery
          </Text>
          {/* <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.delivery_fee}$
        </Text> */}
        </View>
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            Total
          </Text>
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
            {order.total_price.toFixed(2)}$
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;
