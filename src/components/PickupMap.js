import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserAddress } from "../redux/slices/userSlice";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const restaurants = [
  {
    longitude: -123.083922,
    latitude: 36.4220936,
  },
  {
    longitude: -123.083922,
    latitude: 36.4220938,
  },
  {
    longitude: -123.083922,
    latitude: 36.4220932,
  },
  {
    longitude: -123.083922,
    latitude: 36.4220938,
  },
];

const PickupMap = () => {
  const { location } = useSelector(selectUserAddress);
  const initialRegion = {
    latitude: restaurants[0].latitude,
    longitude: restaurants[0].longitude,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
  };
  return (
    <MapView
      className="flex-1"
      initialRegion={initialRegion}
      provider={PROVIDER_GOOGLE}
      key={`${initialRegion.latitude}-${initialRegion.longitude}`}
      //   onPress={(e) => {
      //     setLocation(e);
      //   }}
    >
      {restaurants.map((item, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
        />
      ))}
    </MapView>
  );
};

export default PickupMap;
