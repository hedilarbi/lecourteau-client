import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { getOrdersList } from "../services/UserServices";
import { ActivityIndicator } from "react-native";
import OrderCard from "../components/OrderCard";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Fonts } from "../constants";
import Error from "../components/Error";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useSelector(selectUser);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const fetchData = async () => {
    setErrors(false);
    setIsLoading(true);
    getOrdersList(_id)
      .then((response) => {
        if (response.status) {
          setOrders(response.data.orders);
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
    <View className="flex-1 py-4 px-2 bg-bg">
      {orders.length != 0 ? (
        <ScrollView className="flex-1 ">
          {orders.map((order) => {
            const { createdAt, status, _id, total_price } = order;

            return (
              <OrderCard
                status={status}
                id={_id}
                createdAt={createdAt}
                total={total_price}
                key={_id}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white justify-center items-center">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            Vide
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrdersScreen;
