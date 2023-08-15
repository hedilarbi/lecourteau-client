import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectUserAddress } from "../redux/slices/userSlice";

const DeliveryMap = () => {
  const { location } = useSelector(selectUserAddress);

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  // const setLocation = (e) => {
  //   const { longitude, latitude } = e.nativeEvent.coordinate;
  //   setUserLocation({ longitude, latitude });
  // };
  return (
    <MapView
      className="flex-1"
      initialRegion={initialRegion}
      provider={PROVIDER_GOOGLE}
      // onPress={(e) => {
      //   setLocation(e);
      // }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
};

export default DeliveryMap;
