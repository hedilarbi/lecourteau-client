import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAddress from "../components/UserAddress";
import { Fonts } from "../constants";
import News from "../components/News";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Menu from "../components/Menu";
import Offers from "../components/Offers";
import { selectBasketItems } from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getCategories, getOffers } from "../services/FoodServices";

import { selectUserAddress, setUserAddress } from "../redux/slices/userSlice";

const HomeScreen = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userAddress = useSelector(selectUserAddress);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);

  const basket = useSelector(selectBasketItems);

  const fetchData = async () => {
    try {
      const [categoriesResponse, offersResponse] = await Promise.all([
        getCategories(),
        getOffers(),
      ]);

      if (categoriesResponse.status) {
        setCategories(categoriesResponse.data);
      } else {
        console.error("Categories data not found:", categoriesResponse.message);
      }

      if (offersResponse.status) {
        setOffers(offersResponse.data);
      } else {
        console.error("Offers data not found:", offersResponse.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_MAPS_API_KEY);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      {
        useGoogleMaps: true,
      }
    );

    dispatch(
      setUserAddress({
        address: reverseGeocodeAddress[1],
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      })
    );
    setLocationLoading(false);
  };

  useEffect(() => {
    getUserLocation();
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg px-3 py-4">
      {basket?.length > 0 && (
        <TouchableOpacity
          className="bg-pr rounded-full p-4 absolute bottom-5 right-5 z-30"
          onPress={() => navigation.navigate("MenuNav", { screen: "Card" })}
        >
          <AntDesign name="shoppingcart" size={30} color="black" />
          <View className="absolute top-0 right-0 rounded-full bg-black h-5 w-5 items-center">
            <Text
              className="text-sm text-white"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              {basket.length}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <UserAddress address={userAddress.address} loading={locationLoading} />

      <News />

      <Menu categories={categories} />

      <Offers offers={offers} />
    </SafeAreaView>
  );
};

export default HomeScreen;
