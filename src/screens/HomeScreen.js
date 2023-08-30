import { View, Text, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAddress from "../components/UserAddress";
import { Fonts } from "../constants";
import News from "../components/News";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Menu from "../components/Menu";
import Offers from "../components/Offers";
import { selectBasket, selectBasketItems } from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getCategories, getOffers } from "../services/FoodServices";
import { API_URL } from "@env";
import { selectUserAddress, setUserAddress } from "../redux/slices/userSlice";
import { getRestaurantSettings } from "../services/RestaurantServices";
import WarningBanner from "../components/WarningBanner";
import { setSettings } from "../redux/slices/settingsSlice";
import Map from "../components/Map";
import { ActivityIndicator } from "react-native";
import Error from "../components/Error";

const HomeScreen = () => {
  const [showMap, setShowMap] = useState(false);
  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showWarningBanner, setShowWarningBanner] = useState(false);
  const basket = useSelector(selectBasket);
  const [isLoading, setIsLoading] = useState(true);
  const [addressIsLoading, setAddressIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setErrors(false);
    try {
      const [categoriesResponse, offersResponse, settingsResponse] =
        await Promise.all([
          getCategories(),
          getOffers(),
          getRestaurantSettings(),
        ]);

      if (categoriesResponse.status) {
        setCategories(categoriesResponse.data);
      } else {
        setErrors(true);
      }
      if (settingsResponse.status) {
        dispatch(setSettings(settingsResponse.data));

        if (
          settingsResponse.data.open === false ||
          settingsResponse.data.delivey === false
        ) {
          setShowWarningBanner(true);
        }
      } else {
        setErrors(true);
      }

      if (offersResponse.status) {
        setOffers(offersResponse.data);
      } else {
        setErrors(true);
      }
    } catch (error) {
      setErrors(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = async () => {
    setAddressIsLoading(true);
    Location.setGoogleApiKey(GOOGLE_MAPS_API_KEY);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const response = await Location.reverseGeocodeAsync(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          useGoogleMaps: true,
        }
      );

      const address =
        response[1].streetNumber +
        ", " +
        response[1].street +
        ", " +
        response[1].city +
        ", " +
        response[1].region;

      dispatch(
        setUserAddress({
          address: address,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        })
      );
    } catch (error) {
      setErrors(true);
    } finally {
      setAddressIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchData();
  }, [refresh]);

  if (isLoading || addressIsLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }

  return (
    <SafeAreaView
      className={showMap ? "flex-1 bg-bg " : "flex-1 bg-bg  px-3 py-4"}
    >
      {showWarningBanner && <WarningBanner />}
      {showMap ? (
        <Map setShowMap={setShowMap} />
      ) : (
        <View className="flex-1">
          {(basket?.offers?.length > 0 ||
            basket?.items.length > 0 ||
            basket?.rewards.length > 0) && (
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
                  {basket.items.length +
                    basket.offers.length +
                    basket.rewards.length}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <UserAddress setShowMap={setShowMap} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <News />

            <Menu categories={categories} />

            <Offers offers={offers} />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
