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
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getCategories, getOffers } from "../services/FoodServices";
import axios from "axios";

const HomeScreen = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";
  const basket = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    Location.setGoogleApiKey(GOOGLE_MAPS_API_KEY);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      }
      // const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
      //   {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      //   {
      //     useGoogleMaps: true,
      //   }
      // );
      // console.log(reverseGeocodeAddress);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, offersResponse] = await Promise.all([
          getCategories(),
          getOffers(),
        ]);

        if (categoriesResponse.status) {
          setCategories(categoriesResponse.data);
        } else {
          console.error(
            "Categories data not found:",
            categoriesResponse.message
          );
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
      <UserAddress address={address} />
      <View className="mt-4">
        <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
          what's new
        </Text>
        <View className="bg-pr h-0.5 w-8 "></View>
      </View>
      <News />
      <View className="mt-4 flex-row justify-between items-center">
        <View>
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
            explore menu
          </Text>
          <View className="bg-pr h-0.5 w-8 "></View>
        </View>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate("MenuNav")}
        >
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-sm">
            view all
          </Text>
          <AntDesign
            name="arrowright"
            size={20}
            color="black"
            className="ml-2"
          />
        </TouchableOpacity>
      </View>
      <Menu categories={categories} />
      <View className="mt-4 flex-row justify-between items-center">
        <View>
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
            top offers
          </Text>
          <View className="bg-pr h-0.5 w-8 "></View>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-sm">
            view all
          </Text>
          <AntDesign
            name="arrowright"
            size={20}
            color="black"
            className="ml-2"
          />
        </TouchableOpacity>
      </View>
      <Offers offers={offers} />
    </SafeAreaView>
  );
};

export default HomeScreen;
