import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../constants";
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/slices/basketSlice";
import { useNavigation } from "@react-navigation/native";

const CardMenuItem = ({ name, id, image, uid, size, price, customization }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const deleteItemFromCard = () => {
    dispatch(removeFromBasket({ uid }));
  };
  return (
    <View className=" bg-white rounded-md px-3 py-2 mb-3">
      <View className=" flex-row">
        <View className="h-14 w-14 rounded-md bg-gray-400">
          <Image source={{ uri: image }} className="flex-1 rounded-md" />
        </View>
        <View className=" flex-1 ml-3 justify-between ">
          <View className="flex-row items-center">
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm">
              {name}
            </Text>
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-xs text-tgry ml-2"
            >
              ({size})
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-black flex-row  items-center py-1 px-2"
              onPress={() =>
                navigation.navigate("Customize", {
                  id,
                  price,
                  size,
                  uid,
                  parent: "Card",
                })
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
            <TouchableOpacity onPress={deleteItemFromCard} className="ml-2">
              <Feather name="trash-2" size={20} color="#E34242" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-sm self-end"
          >
            {price} $
          </Text>
          {customization.length > 0 && (
            <TouchableOpacity
              className="items-center flex-row"
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text
                className="text-xs text-pr mr-2"
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                View Customization
              </Text>
              <Entypo name="chevron-thin-down" size={14} color="#F7A600" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDetails && (
        <View className="mt-2 border-t border-gray-300">
          {customization.map((item, index) => (
            <View
              className="flex-row justify-between items-center mt-3"
              key={index}
            >
              <Image
                source={{ uri: item.image }}
                className="h-6 w-6 rounded-full"
              />
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-xs"
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-xs"
              >
                {item.price} $
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CardMenuItem;
