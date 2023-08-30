import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants/";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { setUserInfo } from "../services/UserServices";
import { ActivityIndicator } from "react-native";

const SetupProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
          Alert.alert("problem from setup profile Screen");
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
    <SafeAreaView className="flex-1 py-4 px-3 bg-bg">
      <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
        Setup Profile
      </Text>
      <View className="mt-3 flex-1">
        <View className="mx-auto h-20 w-20 rounded-full justify-center items-center bg-gray-400">
          <Entypo name="camera" size={26} color="black" />
          <View className="absolute -bottom-3 flex-row justify-center z-40 ">
            <TouchableOpacity
              className="bg-black h-6 w-6 rounded-full items-center justify-center  "
              onPress={pickImage}
            >
              <Entypo name="plus" size={16} color="#F7A600" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-12">
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
  );
};

export default SetupProfileScreen;
