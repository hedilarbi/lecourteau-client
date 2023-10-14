import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fonts } from "../constants";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { TouchableOpacity } from "react-native";

import { updateUserInfo } from "../services/UserServices";
import { ActivityIndicator } from "react-native";
import SuccessModel from "../components/SuccessModel";
import ErrorModal from "../components/ErrorModal";
import { formatDate } from "../utils/dateHandlers";

const CompleteProfileScreen = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name);

  const [email, setEmail] = useState(user.email);
  const nameInput = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      // After 1 second, reset showSuccessModel to false
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts before 1 second
    }
    if (isFail) {
      // After 1 second, reset showSuccessModel to false
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts before 1 second
    }
  }, [isSuccess, isFail]);

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
    if (email.length <= 0) {
      emailInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }

    setIsLoading(true);
    updateUserInfo(user._id, name, email)
      .then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
          setIsSuccess(true);
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
    <SafeAreaView className="flex-1 py-4 px-3 bg-bg">
      <SuccessModel visiblity={isSuccess} />
      <ErrorModal visiblity={isFail} />
      <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-xl">
        Setup Profile
      </Text>
      <View className="mt-3 flex-1">
        <View className="mt-6">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Phone Number
          </Text>
          <TextInput
            className="py-2 px-2 bg-white rounded-md mt-2"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            placeholder={user.phone_number}
            editable={false}
          />
        </View>
        <View className="mt-4">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Full Name*
          </Text>
          <TextInput
            placeholder={user.name}
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
            placeholder={user.email}
            onChangeText={(text) => setEmail(text)}
            ref={emailInput}
          />
        </View>
        <View className="mt-4 ">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Date Of Birth
          </Text>
          <TextInput
            className="py-2 px-2 bg-white rounded-md mt-2"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            placeholder={formatDate(user.date_of_birth)}
            editable={false}
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-pr items-center py-3 rounded-md"
        onPress={updateUser}
      >
        <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;
