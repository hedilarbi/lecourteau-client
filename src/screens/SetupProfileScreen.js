import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import { Fonts } from "../constants/";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { setUserInfo } from "../services/UserServices";
import ErrorModal from "../components/ErrorModal";
import { emailValidator } from "../utils/Validators";

const SetupProfileScreen = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyC2t8GvZFa6Ld6fbKM6_m2n3M0JoOmI03w";

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const nameInput = useRef(null);
  const emailInput = useRef(null);

  const { _id } = useSelector(selectUser);

  useEffect(() => {
    if (isFail) {
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFail]);

  const handlePlaceSelect = async (data, details) => {
    try {
      const { description } = details;
      const response = await Location.geocodeAsync(description);

      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        //setSelectedCoordinate({ latitude, longitude });
        setAddress(description);
        setCoords({ latitude, longitude });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    if (name.length <= 0) {
      nameInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }
    const isEmailValid = emailValidator(email);
    if (isEmailValid) {
      emailInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }

    setIsLoading(true);

    setUserInfo(_id, name, email, address, coords)
      .then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
        } else {
          console.log(response);
          setIsFail(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 py-4 px-3 bg-bg">
        <ErrorModal visiblity={isFail} />

        <View className="mt-3 flex-1">
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
            Setup Profile
          </Text>
          <View className="mt-6">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              Full Name*
            </Text>
            <TextInput
              placeholder="Full Name*"
              className=" py-2 px-2 bg-white rounded-md mt-2 text-black"
              style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
              onChangeText={(text) => setName(text)}
              ref={nameInput}
            />
          </View>

          <View className="mt-4 ">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              Email*
            </Text>
            <TextInput
              className="py-2 px-2 bg-white rounded-md mt-2"
              style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
              placeholder="Email*"
              onChangeText={(text) => setEmail(text)}
              ref={emailInput}
            />
          </View>
          <View className="mt-4 flex-1">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              Address
            </Text>
            <View className="bg-white rounded-md flex-row items-center  mt-2">
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
        </View>
        <TouchableOpacity
          className="bg-pr items-center py-3 rounded-md"
          onPress={updateUser}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SetupProfileScreen;
