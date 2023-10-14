import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ErrorModal from "../components/ErrorModal";
import CanadaFlag from "../../assets/icons/CanadaFlag.svg";
import { Fonts } from "../constants";
import { useSelector } from "react-redux";
import { selectAuthData } from "../redux/slices/authSlice";

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const authdata = useSelector(selectAuthData);

  const sendOtp = async () => {
    phoneNumberInput.current.setNativeProps({
      style: {
        borderWidth: 0,
      },
    });
    if (phoneNumber.length <= 0) {
      phoneNumberInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }
    setIsLoading(true);
    const formattedValue = "+1" + phoneNumber;
    // sendSmsVerification(formattedValue).then((sent) => {
    //   navigation.navigate("Otp", { phoneNumber: formattedValue });
    // });
    navigation.navigate("Otp", {
      phoneNumber: formattedValue,
    });
    setIsLoading(false);
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 py-4 px-3 bg-bg">
        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base">
          Please Enter Your Phone Number
        </Text>
        <View className="mt-1 flex-1">
          <View
            className="bg-white rounded-md mt-4 flex-row px-1 py-1"
            ref={phoneNumberInput}
          >
            <View className="flex-row bg-gray-100 px-3 py-2 items-center rounded-md">
              <CanadaFlag />
              <Text style={{ fontFamily: Fonts.LATO_REGULAR }}>+1</Text>
            </View>
            <TextInput
              placeholder="Phone Number"
              className="flex-1 ml-5"
              placeholderTextColor="#CBC6C6"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              keyboardType="numeric"
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <Text
            className="text-xxs mt-2 text-tgry "
            style={{ fontFamily: Fonts.LATO_REGULAR }}
          >
            e.x 8XXXXXXX
          </Text>
          <TouchableOpacity
            className=" bg-pr rounded-md py-2 mt-8 items-center"
            onPress={sendOtp}
          >
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD }}
              className="text-base "
            >
              Send Otp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhoneNumberScreen;
