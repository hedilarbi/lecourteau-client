import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserAddress,
  setUser,
  setUserAddress,
} from "../redux/slices/userSlice";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Fonts } from "../constants";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToAddresses } from "../services/UserServices";

const SetAddressScreen = () => {
  const { location, address } = useSelector(selectUserAddress);
  const { _id } = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const handlePlaceSelect = async (data, details) => {
    try {
      const { description } = details;
      const response = await Location.geocodeAsync(description);

      if (response.length > 0) {
        const { latitude, longitude } = response[0];

        dispatch(
          setUserAddress({
            address: description,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleMarkerPlace = async (e) => {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
      {
        latitude: latitude,
        longitude: longitude,
      },
      {
        useGoogleMaps: true,
      }
    );
    // Initialize variables for each part of the address
    let streetNumber = "";
    let street = "";
    let region = "";
    let city = "";

    // Check if reverseGeocodeAddress[1] exists and has streetNumber and street properties
    if (reverseGeocodeAddress[1]) {
      streetNumber = reverseGeocodeAddress[1].streetNumber || "";
      street = reverseGeocodeAddress[1].street || "";
      region = reverseGeocodeAddress[1].region || "";
      city = reverseGeocodeAddress[1].city || "";
    }

    const address =
      streetNumber +
      (streetNumber.length > 0 ? ", " : "") +
      street +
      (street.length > 0 ? ", " : "") +
      region +
      ", " +
      city;
    dispatch(
      setUserAddress({
        address: address,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      })
    );
  };

  const addAddress = async () => {
    setIsLoading(true);

    addToAddresses(_id, address, location).then((response) => {
      if (response.status) {
        dispatch(setUser(response.data));
        navigation.goBack();
      } else {
        console.log(response);
      }
    });
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="absolute  px-3 w-full  flex-row top-7 z-30">
        <TouchableOpacity
          className="bg-black rounded-full p-2 justify-center items-center h-10 w-10"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#F7A600" />
        </TouchableOpacity>
        <View className="bg-white rounded-md flex-row items-center flex-1 ml-8">
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details) => handlePlaceSelect(data, details)}
            query={{
              key: `${GOOGLE_MAPS_API_KEY}`,
              language: "en",
            }}
          />
        </View>
      </View>
      <MapView
        className="flex-1"
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        key={`${initialRegion.latitude}-${initialRegion.longitude}`}
        onPress={(e) => {
          handleMarkerPlace(e);
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          draggable
          tappable
          onDragEnd={(e) => handleMarkerPlace(e)}
        />
      </MapView>
      <View className="bg-white py-4 px-3">
        <View className="flex-row items-center">
          <FontAwesome5 name="map-pin" size={24} color="black" />
          <View className="ml-4">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 12 }}>
              Address
            </Text>
            <Text
              className="text-tgry mt-1"
              style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 10 }}
            >
              {address}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-pr rounded-md  items-center py-3 mt-4"
          onPress={addAddress}
        >
          <Text
            style={{
              fontFamily: Fonts.LATO_BOLD,
              fontSize: 14,
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetAddressScreen;
