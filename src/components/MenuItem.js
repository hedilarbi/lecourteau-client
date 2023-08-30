import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Fonts } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import {
  addToBasket,
  deleteFromBasket,
  removeFromBasket,
  selectBasketItemsWithID,
} from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import DropDown from "./DropDown";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { addToFavorites, removeFromFavorites } from "../services/UserServices";

const MenuItem = ({ name, image, description, prices, id }) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const itemsList = useSelector(selectBasketItemsWithID(id));
  const user = useSelector(selectUser);

  const sizes = prices.map((item) => item.size);
  const [size, setSize] = useState(prices[0].size);
  const [price, setPrice] = useState(prices[0].price);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, price, size, name, image, customization: [] }));
  };
  const removeItemFromBasket = () => {
    dispatch(deleteFromBasket({ id }));
  };

  useEffect(() => {
    if (user.favorites?.includes(id)) {
      setLike(true);
    }
  }, []);

  const handleLikeButton = () => {
    if (like) {
      removeFromFavorites(user._id, id)
        .then((response) => {
          if (response.status) {
            dispatch(setUser(response.data));
          }
        })
        .then(() => {
          setLike(!like);
        });
    } else {
      addToFavorites(user._id, id)
        .then((response) => {
          if (response.status) {
            dispatch(setUser(response.data));
          }
        })
        .then(() => {
          setLike(!like);
        });
    }
  };

  useEffect(() => {
    const selectedItem = prices.find((item) => item.size === size);
    setPrice(selectedItem.price);
  }, [size]);

  return (
    <View className="flex-row  bg-white mb-3 rounded-md" key={id}>
      <View className="h-24">
        <Image source={{ uri: image }} className="h-full w-24 rounded-l-md" />
        <TouchableOpacity
          className="bg-pr flex-row  items-center py-1 px-2 absolute bottom-3 self-center"
          onPress={() =>
            navigation.navigate("Customize", {
              id,
              price,
              size,
              parent: "Menu",
            })
          }
        >
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-black text-xs mr-3"
          >
            Customize
          </Text>
          <AntDesign name="arrowright" size={14} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-2 py-1 justify-between">
        <View className="flex-row justify-between items-center  ">
          <View className="flex-row items-center w-3/4">
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD }}
              className="text-sm "
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
          {like ? (
            <TouchableOpacity onPress={handleLikeButton}>
              <AntDesign name="heart" size={24} color="#E72D2D" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLikeButton}>
              <AntDesign name="hearto" size={24} color="#E72D2D" />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-tgry"
          >
            {price} $
          </Text>
        </View>

        <View className=" flex-row justify-between items-center ">
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
