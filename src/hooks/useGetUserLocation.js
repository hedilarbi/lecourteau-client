import { useEffect } from "react";

import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserAddress } from "../redux/slices/userSlice";
import { GOOGLE_MAPS_API_KEY } from "@env";
import {
  selectRestaurants,
  setRestaurant,
} from "../redux/slices/settingsSlice";

Location.setGoogleApiKey(GOOGLE_MAPS_API_KEY);

const useGetUserLocation = () => {
  const dispatch = useDispatch();
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const restaurants = useSelector(selectRestaurants);
  let address;

  const getUserLocation = async () => {
    setLocationLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      const response = await Location.reverseGeocodeAsync(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          useGoogleMaps: true,
        }
      );

      let streetNumber = "";
      let street = "";
      let region = "";
      let city = "";

      if (response[1]) {
        streetNumber = response[1].streetNumber || "";
        street = response[1].street || "";
        region = response[1].region || "";
        city = response[1].city || "";
      }

      address =
        streetNumber +
        (streetNumber.length > 0 ? ", " : "") +
        street +
        (street.length > 0 ? ", " : "") +
        region +
        ", " +
        city;
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const restaurantIndex = getClosesRestaurant(userCoords, restaurants);

      dispatch(setRestaurant(restaurants[restaurantIndex]));

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
      setLocationError(error);
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    if (restaurants.length > 0) {
      getUserLocation();
    }
  }, [restaurants]);
  return {
    locationLoading,
    locationError,
    address,
  };
};

export default useGetUserLocation;

function calculateDistance(userCoords, restaurantCoords) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(restaurantCoords.latitude - userCoords.latitude);
  const dLon = deg2rad(restaurantCoords.longitude - userCoords.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userCoords.latitude)) *
      Math.cos(deg2rad(restaurantCoords.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getClosesRestaurant(userCoords, restaurants) {
  let minDistance;
  let restaurantIndex = 0;

  for (let i = 0; i < restaurants.length; i++) {
    var distance = calculateDistance(userCoords, restaurants[i].location);

    if (i === 0) {
      minDistance = distance;
    } else {
      if (distance < minDistance) {
        restaurantIndex = i;
        minDistance = distance;
      }
    }
  }
  return restaurantIndex;
}
