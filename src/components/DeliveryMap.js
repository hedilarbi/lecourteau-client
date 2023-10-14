import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAddress, setUserAddress } from "../redux/slices/userSlice";
import { Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fonts } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { setOrderTypeAndAddress } from "../redux/slices/orderSlide";
import { GOOGLE_MAPS_API_KEY } from "@env";

const DeliveryMap = () => {
  const { location, address } = useSelector(selectUserAddress);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    const address =
      reverseGeocodeAddress[1].streetNumber +
      ", " +
      reverseGeocodeAddress[1].street +
      ", " +
      reverseGeocodeAddress[1].city +
      ", " +
      reverseGeocodeAddress[1].region;

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
  const confirmation = () => {
    dispatch(
      setOrderTypeAndAddress({
        coords: location,
        type: "Delivery",
        address: address,
      })
    );
    navigation.navigate("Paiement");
  };
  return (
    <View className="flex-1">
      <View className="absolute  px-3 w-full  flex-row top-5 z-30">
        <View className="bg-white rounded-md flex-row items-center flex-1">
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
          onPress={confirmation}
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

export default DeliveryMap;
