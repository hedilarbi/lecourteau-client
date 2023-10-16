import { useEffect } from "react";

import * as Location from "expo-location"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUserAddress } from "../redux/slices/userSlice";


const useGetUserLocation = () => {
    const dispatch = useDispatch()
    const [locationLoading,setLocationLoading] = useState(false)
    const [locationError,setLocationError] = useState(null)
    let address

  const getUserLocation = async () => {
    setLocationLoading(true)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      
      let location = await Location.getCurrentPositionAsync();
      console.log("location")
      const response = await Location.reverseGeocodeAsync(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          useGoogleMaps: true,
        }
      );
     console.log("response")
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
     setLocationError(error)
    } finally{
        setLocationLoading(false)
    }
  };

  useEffect(() => {
    getUserLocation()
  }, []);
return{
    locationLoading,locationError,address
}
  
};

export default useGetUserLocation;
