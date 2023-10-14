import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import { checkVerification, sendSmsVerification } from "../services/Verify";
import { Fonts } from "../constants/index";
import { createUser } from "../services/UserServices";
import { setUser, setUserToken } from "../redux/slices/userSlice";
import OtpFr from "../translation/fr/Otp";
import OtpEn from "../translation/en/Otp";

const translation = {
  en: OtpEn,
  fr: OtpFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const OtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { phoneNumber } = route.params;

  const [invalidCode, setInvalidCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputs = Array(6)
    .fill(0)
    .map((_, i) => useRef(null));

  const handleInputChange = (text, index) => {
    // Move to the next input
    if (text.length === 1 && index < 5) {
      inputs[index + 1].current.focus();
    }

    // Update the OTP state
    const newOtp = otp.substring(0, index) + text + otp.substring(index + 1);
    setOtp(newOtp);
  };
  const saveUserToken = async (token) => {
    await setItemAsync("token", token);
  };

  const verifyCode = async () => {
    setIsLoading(true);
    // checkVerification(phoneNumber, otp).then((success) => {
    //   if (!success) setInvalidCode(true);
    //   else {
    //     createUser(phoneNumber).then((response) => {
    //       if (response.status) {
    //         saveUserToken(response.data.token);
    //         dispatch(setUserToken(response.data.token));
    //         dispatch(setUser(response.data.user));
    //       }
    //     });
    //   }
    // });
    createUser(phoneNumber).then((response) => {
      if (response.status) {
        saveUserToken(response.data.token);
        dispatch(setUserToken(response.data.token));
        dispatch(setUser(response.data.user));
      }
    });
    setIsLoading(false);
  };

  const resendCode = async () => {
    sendSmsVerification(phoneNumber);
  };
  return (
    <SafeAreaView className="bg-bg flex-1">
      {isLoading && (
        <View
          className="justify-center items-center h-full w-full absolute top-0 left-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <ActivityIndicator size="large" color="#F7A600" />
        </View>
      )}
      <View className="flex-1 p-5">
        <TouchableOpacity
          className="bg-black justify-center items-center p-2 rounded-full w-10 h-10 "
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={22} color="#F7A600" />
        </TouchableOpacity>
        <Text
          className="text-center text-pr text-lg mt-10"
          style={{ fontFamily: Fonts.LATO_BOLD }}
        >
          {i18n.t("verify_title")}
        </Text>
        <Text
          className="text-base  text-gray-500 mt-5 text-center"
          style={{ fontFamily: Fonts.LATO_REGULAR }}
        >
          {i18n.t("verify_subtitle")} {phoneNumber}
        </Text>
        <View style={styles.container}>
          {inputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={input}
            />
          ))}
        </View>
        {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
        <View className="flex-row items-center justify-center mt-10">
          <TouchableOpacity
            className="bg-pr rounded-full px-10 py-3 justify-center items-center"
            onPress={verifyCode}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base">
              {i18n.t("verify_button")}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-8 items-center">
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-sm text-gray-500"
          >
            {i18n.t("resend_verify")}
          </Text>
          <TouchableOpacity className="ml-1" onPress={resendCode}>
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-ms text-pr"
            >
              {i18n.t("resend_button")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#F7A600",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default OtpScreen;
