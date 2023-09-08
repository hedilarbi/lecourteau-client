import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserAddress,
  setUser,
  setUserAddress,
} from "../redux/slices/userSlice";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AddressesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { addresses } = useSelector(selectUser);

  const { address, location } = useSelector(selectUserAddress);

  const [addressesList, setAddressesList] = useState([]);
  useEffect(() => {
    let list = [];
    addresses.map((item) => {
      if (item.address === address) {
        list.push({
          address: item.address,
          coords: item.coords,
          is_selected: true,
        });
      } else {
        list.push({
          address: item.address,
          coords: item.coords,
          is_selected: false,
        });
      }
    });

    setAddressesList(list);
  }, []);

  const selectAddress = (newAddress, newCoords) => {
    const newList = addressesList.map((item) => {
      if (item.address === newAddress) {
        return { address: newAddress, coords: newCoords, is_selected: true };
      } else {
        return { address: item.address, coords: newCoords, is_selected: false };
      }
    });
    setAddressesList(newList);
    dispatch(
      setUserAddress({
        address: newAddress,
        location: {
          longitude: newCoords.longitude,
          latitude: newCoords.latitude,
        },
      })
    );
  };

  return (
    <View className="flex-1 bg-bg p-2">
      {addresses.length > 0 ? (
        <View className="bg-white px-3 pb-3  rounded-md">
          <TouchableOpacity
            className=" flex-row justify-between items-center border-b border-gray-300 py-2 mt-2"
            onPress={() => navigation.navigate("SetAddress")}
          >
            <Text
              style={{
                fontFamily: Fonts.LATO_REGULAR,
                fontSize: 14,
              }}
            >
              Add new Address
            </Text>
            <Entypo name="plus" size={18} color="black" />
          </TouchableOpacity>
          {addressesList.map((item, index) => {
            return (
              <TouchableOpacity
                className=" flex-row justify-between items-center  border-gray-300 py-2 mt-2 "
                onPress={() => selectAddress(item.address, item.coords)}
                key={index}
              >
                <Text
                  style={{
                    fontFamily: Fonts.LATO_REGULAR,
                    fontSize: 14,
                    width: "80%",
                  }}
                  numberOfLines={1}
                >
                  {item.address}
                </Text>
                <View className="h-4 w-4 rounded-full border-pr border  justify-center items-center">
                  <View
                    className={
                      item.is_selected ? "bg-pr h-2 w-2 rounded-full" : ""
                    }
                  ></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View className="flex-1">
          <View className="bg-white rounded-md justify-center items-center flex-1">
            <Text style={{ fontFamily: Fonts.LATO_BOLD }}>
              Aucune Addresse Engregistré
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddressesScreen;
