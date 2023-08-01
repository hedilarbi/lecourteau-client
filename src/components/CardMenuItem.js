import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Fonts } from "../constants";
import { Entypo, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/slices/basketSlice";

const CardMenuItem = ({
  name,
  id,
  image,
  description,
  size,
  price,
  customization,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const deleteItemFromCard = () => {
    dispatch(removeFromBasket({ id }));
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
          <TouchableOpacity onPress={deleteItemFromCard}>
            <Feather name="trash-2" size={20} color="#E34242" />
          </TouchableOpacity>
        </View>
        <View className="justify-between">
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-sm self-end"
          >
            {price} $
          </Text>
          {customization && (
            <TouchableOpacity
              className="items-center flex-row"
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text
                className="text-sm text-pr mr-2"
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                View Customization
              </Text>
              <Entypo name="chevron-thin-down" size={16} color="#F7A600" />
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
