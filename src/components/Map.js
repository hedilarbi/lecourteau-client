import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAddress, setUserAddress } from "../redux/slices/userSlice";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native";
import * as Location from "expo-location";
import { Fonts } from "../constants";
import { Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const Map = ({ setShowMap }) => {
  const { location, address } = useSelector(selectUserAddress);

  const dispatch = useDispatch();

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
        //setSelectedCoordinate({ latitude, longitude });
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
  return (
    <View className="flex-1">
      <View className="absolute  px-3 w-full  flex-row top-7 z-30">
        <TouchableOpacity
          className="bg-black rounded-full p-2 justify-center items-center h-10 w-10"
          onPress={() => setShowMap(false)}
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
          onPress={() => setShowMap(false)}
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
    </View>
  );
};

export default Map;
