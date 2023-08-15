import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/slices/basketSlice";
import { Fonts } from "../constants";
import CardMenuItem from "../components/CardMenuItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../redux/slices/userSlice";
import { setOrder } from "../redux/slices/orderSlide";

const CardScreen = () => {
  const basketItems = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [instructions, setInstructions] = useState("");
  const deliveryFee = 5;
  const subTotal = useSelector(selectBasketTotal);
  const total = deliveryFee + parseFloat(subTotal);
  const user = useSelector(selectUser);

  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    setBasketList(basketItems);
  }, [basketItems]);

  const checkout = () => {
    const orderItems = [];
    basketList.map((item) => {
      const customizations = item.customization
        ? item.customization.map((customizationItem) => customizationItem._id)
        : [];

      orderItems.push({
        size: item.size,
        customizations,
        price: item.price,
      });
    });

    const order = {
      user_id: user._id,
      orderItems,
      subTotal,
      total,
      deliveryFee,
      instructions,
    };

    dispatch(setOrder(order));

    navigation.navigate("Checkout");
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="px-3  py-3 bg-bg flex-1 ">
        <View className="" style={{ height: "50%", width: "100%" }}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingVertical: 6,
            }}
          >
            {basketList.map((item, index) => (
              <CardMenuItem
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                customization={item.customization}
                size={item.size}
                id={item.id}
                key={index}
              />
            ))}
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
              style={{ fontFamily: Fonts.LATO_BOLD }}
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
              {deliveryFee}$
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
          className="bg-pr rounded-md items-center justify-center py-4  mt-4"
          onPress={checkout}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardScreen;

// function groupItemsById(items) {
//   const groupedItems = {};
//   items.forEach((item) => {
//     if (!item.customization) {
//       if (!groupedItems[item.id]) {
//         groupedItems[item.id] = [];
//       }
//       groupedItems[item.id].push(item);
//     }
//   });

//   return Object.values(groupedItems);
// }
