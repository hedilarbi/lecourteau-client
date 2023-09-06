import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants/";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { setUserInfo } from "../services/UserServices";
import { ActivityIndicator } from "react-native";
import ErrorModal from "../components/ErrorModal";

const SetupProfileScreen = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const [isFail, setIsFail] = useState(false);
  useEffect(() => {
    if (isFail) {
      // After 1 second, reset showSuccessModel to false
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts before 1 second
    }
  }, [isFail]);

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
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (email.length <= 0 || !email.match(regEx)) {
      emailInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }
    const address = {
      city,
      region,
      street,
      number,
    };
    setIsLoading(true);
    setUserInfo(_id, name, email, address)
      .then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
        } else {
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
      <SafeAreaView className="flex-1 py-4 px-3 bg-bg">
        <ErrorModal visiblity={isFail} />

        <View className="mt-3 flex-1">
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
          <View className="mt-4 ">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              Address
            </Text>
            <View className="flex-row flex-wrap gap-4 mt-2">
              <TextInput
                className=" py-2 px-2 bg-white rounded-md  w-1/3"
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                placeholder="City"
                onChangeText={(text) => setCity(text)}
              />
              <TextInput
                className=" py-2 px-2 bg-white rounded-md  w-1/3"
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                placeholder="Region"
                onChangeText={(text) => setRegion(text)}
              />
              <TextInput
                className=" py-2 px-2 bg-white rounded-md w-1/3 "
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                placeholder="street "
                onChangeText={(text) => setStreet(text)}
              />
              <TextInput
                className=" py-2 px-2 bg-white rounded-md w-1/4   "
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                placeholder="Number"
                onChangeText={(text) => setNumber(text)}
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SetupProfileScreen;
