import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Fonts } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import {
  addToBasket,
  deleteFromBasket,
  selectBasketItemsWithID,
} from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import DropDown from "./DropDown";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { addToFavorites, removeFromFavorites } from "../services/UserServices";
import WarningModel from "./WarningModel";
import { memo } from "react";
import OutOfStockModal from "./OutOfStockModal";

const MenuItem = memo(
  ({ name, image, prices, id, is_available, text, setIsLoading }) => {
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const itemsList = useSelector(selectBasketItemsWithID(id));
    const user = useSelector(selectUser);
    const [isFail, setIsFail] = useState(false);
    const sizes = prices.map((item) => item.size);
    const [size, setSize] = useState(prices[0].size);
    const [price, setPrice] = useState(prices[0].price);
    const [showWarningModel, setShowWarningModel] = useState(false);
    const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);

    useEffect(() => {
      if (isFail) {
        const timer = setTimeout(() => {
          setIsFail(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [isFail]);

    const addItemToBasket = () => {
      setIsLoading(true);
      if (is_available) {
        dispatch(
          addToBasket({ id, price, size, name, image, customization: [] })
        );
      } else {
        setShowOutOfStockModal(true);
      }
      setIsLoading(false);
    };
    const removeItemFromBasket = () => {
      setIsLoading(true);
      dispatch(deleteFromBasket({ id }));
      setIsLoading(false);
    };

    useEffect(() => {
      if (user?.favorites?.includes(id)) {
        setLike(true);
      }
    }, []);

    const handleLikeButton = () => {
      if (!user || Object.keys(user).length === 0) {
        setShowWarningModel(true);
      } else {
        setIsLoading(true);
        if (like) {
          removeFromFavorites(user._id, id)
            .then((response) => {
              if (response.status) {
                dispatch(setUser(response.data));
              } else {
                setIsFail(false);
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
              } else {
                setIsFail(false);
              }
            })
            .then(() => {
              setLike(!like);
            });
        }
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const selectedItem = prices.find((item) => item.size === size);
      setPrice(selectedItem.price);
    }, [size]);

    return (
      <View className="flex-row  bg-white mb-3 rounded-md mt-2 mx-2" key={id}>
        <WarningModel
          setShowWarningModel={setShowWarningModel}
          showWarningModel={showWarningModel}
        />
        <OutOfStockModal
          setShowOutOfStockModal={setShowOutOfStockModal}
          showOutOfStockModal={showOutOfStockModal}
        />

        <View className="h-32">
          <Image source={{ uri: image }} className="h-full w-32 rounded-l-md" />
          <TouchableOpacity
            className="bg-pr flex-row  items-center py-2 px-3 absolute bottom-3 self-center"
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
              style={{ fontFamily: Fonts.BEBAS_NEUE }}
              className="text-black text-sm mr-3"
            >
              {text.customize}
            </Text>
            <AntDesign name="arrowright" size={14} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 px-2 py-1 justify-between">
          <View className="flex-row justify-between items-center  ">
            <View className="flex-row items-center w-3/4">
              <Text
                style={{ fontFamily: Fonts.LATO_BOLD }}
                className="text-sm w-3/4 "
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
            {!is_available && (
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-sm text-red-500"
              >
                {text.stock}
              </Text>
            )}
          </View>

          <View className=" flex-row justify-between items-center ">
            <View className="justify-between">
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-xs justify-self-start"
              >
                {text.size}
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
  }
);

export default MenuItem;
