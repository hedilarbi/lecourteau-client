import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import * as Linking from "expo-linking";

import CanadaFlag from "../../assets/icons/CanadaFlag.svg";
import FullLogo from "../../assets/icons/FullLogo.svg";
import { Fonts } from "../constants";
import SignupFr from "../translation/fr/Signup";
import SignupEn from "../translation/en/Signup";

const translation = {
  en: SignupEn,
  fr: SignupFr,
};
const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const phoneNumberInput = useRef(null);

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
    navigation.navigate("Otp", { phoneNumber: formattedValue });
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isLoading && (
        <View
          className="justify-center items-center absolute top-0 left-0 z-30 h-full w-full"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <ActivityIndicator size="large" color="#F7A600" />
        </View>
      )}
      <SafeAreaView className="flex-1 bg-pr ">
        <View
          style={{ height: "50%", backgroundColor: "black" }}
          className="items-center justify-center"
        >
          <FullLogo />
        </View>
        <View className="w-11/12  bg-[#EBEBEB]  absolute self-center bottom-14 rounded-2xl p-6">
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm ">
            {i18n.t("sign_up_title")}
          </Text>
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-xs text-tgry mt-1"
          >
            {i18n.t("sign_up_subtitle")}
          </Text>
          <View
            className="bg-white rounded-md mt-4 flex-row px-3 py-1"
            ref={phoneNumberInput}
          >
            <View className="flex-row bg-gray-100 px-3 py-2 items-center rounded-md">
              <CanadaFlag />
              <Text style={{ fontFamily: Fonts.LATO_REGULAR }}>+1</Text>
            </View>
            <TextInput
              placeholder={i18n.t("phone_number")}
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
            className="mt-5 bg-pr rounded-md py-2 items-center"
            onPress={sendOtp}
          >
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD }}
              className="text-base "
            >
              {i18n.t("sign_up_button")}
            </Text>
          </TouchableOpacity>
          {/* <Text
            className="mt-8 text-sm"
            style={{ fontFamily: Fonts.LATO_BOLD }}
          >
            {i18n.t("sign_up_options")}
          </Text> */}
          <View className="h-36"></View>

          <View className="flex-row justify-between items-center mt-9 ">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://lecourteau.com/termes-conditions/");
              }}
            >
              <Text
                className="text-pr text-xxs"
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                TERMS & CONDITIONS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main")}
              className=""
            >
              <Text
                className="text-xxs"
                style={{
                  fontFamily: Fonts.LATO_REGULAR,
                  textTransform: "uppercase",
                }}
              >
                {i18n.t("skip_login_button")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
