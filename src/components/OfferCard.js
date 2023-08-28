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
import { removeOfferFromBasket } from "../redux/slices/basketSlice";

const OfferCard = ({
  name,
  id,
  image,

  price,
  items,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const deleteItemFromCard = () => {
    dispatch(removeOfferFromBasket({ id }));
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

          <TouchableOpacity
            className="items-center flex-row"
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text
              className="text-sm text-pr mr-2"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
            >
              View Items
            </Text>
            {showDetails ? (
              <Entypo name="chevron-thin-up" size={16} color="#F7A600" />
            ) : (
              <Entypo name="chevron-thin-down" size={16} color="#F7A600" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {showDetails && (
        <View className="mt-2 border-t border-gray-300">
          {items.map((item, index) => (
            <View
              className="flex-row justify-between items-center mt-3"
              key={index}
            >
              <Image
                source={{ uri: item.item.image }}
                className="h-6 w-6 rounded-full"
              />
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-xs"
              >
                {item.item.name}
              </Text>

              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-xs"
              >
                x {item.quantity}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default OfferCard;
