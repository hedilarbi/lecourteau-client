import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Fonts } from "../constants";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithID,
} from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import DropDown from "./DropDown";

const MenuItem = ({ name, image, description, prices, id }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const itemsList = useSelector(selectBasketItemsWithID(id));

  const sizes = prices.map((item) => item.size);
  const [size, setSize] = useState(prices[0].size);
  const [price, setPrice] = useState(prices[0].price);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, price, size, name, image }));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  useEffect(() => {
    const selectedItem = prices.find((item) => item.size === size);
    setPrice(selectedItem.price);
  }, [size]);

  return (
    <View className="flex-row  bg-white mb-3 rounded-md" key={id}>
      <View className="h-32">
        <Image source={{ uri: image }} className="h-full w-28 rounded-l-md" />
      </View>
      <View className="flex-1 px-2 py-1 justify-between">
        <View className="flex-row justify-between items-center  ">
          <View className="flex-row items-center">
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              {name}
            </Text>
            {/* <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-xs text-tgry ml-2"
            >
              {description}
            </Text> */}
          </View>
          <AntDesign name="hearto" size={24} color="#E72D2D" />
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            {price} $
          </Text>
          <View className="justify-between">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-xs justify-self-start"
            >
              Choose size
            </Text>
            <DropDown sizes={sizes} setSize={setSize} size={size} />
            <View className="h-2"></View>
          </View>
        </View>

        <View className=" flex-row justify-between items-center ">
          <TouchableOpacity
            className="bg-black flex-row  items-center py-2 px-4"
            onPress={() =>
              navigation.navigate("Customize", { id, price, size })
            }
          >
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-white text-xs mr-3"
            >
              Customize
            </Text>
            <AntDesign name="arrowright" size={12} color="white" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-bg p-1"
              onPress={removeItemFromBasket}
              disabled={itemsList.length < 1}
            >
              <AntDesign name="minus" size={18} color="black" />
            </TouchableOpacity>
            <Text
              className="mx-2 text-sm"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              {itemsList.length}
            </Text>
            <TouchableOpacity className="bg-pr p-1" onPress={addItemToBasket}>
              <AntDesign name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuItem;
