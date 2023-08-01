import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FullLogo from "../../assets/icons/FullLogo.svg";
import { Fonts } from "../constants";
import CanadaFlag from "../../assets/icons/CanadaFlag.svg";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1 bg-pr ">
        <View
          style={{ height: "50%", backgroundColor: "black" }}
          className="items-center justify-center"
        >
          <FullLogo />
        </View>
        <View className="w-11/12  bg-[#EBEBEB]  absolute self-center bottom-14 rounded-2xl p-6">
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-sm ">
            Sign in with phone number
          </Text>
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-xs text-tgry mt-1"
          >
            Login with a valid phone number
          </Text>
          <View className="bg-white rounded-md mt-4 flex-row px-3 py-1">
            <View className="flex-row bg-gray-100 px-3 py-2 items-center rounded-md">
              <CanadaFlag />
              <Text style={{ fontFamily: Fonts.LATO_REGULAR }}>+1</Text>
            </View>
            <TextInput
              placeholder="Phone Number"
              className="flex-1 ml-5"
              placeholderTextColor="#CBC6C6"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
            />
          </View>
          <Text
            className="text-xxs mt-2 text-tgry "
            style={{ fontFamily: Fonts.LATO_REGULAR }}
          >
            e.x 8XXXXXXX
          </Text>

          <TouchableOpacity className="mt-5 bg-pr rounded-md py-2 items-center">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR }}
              className="text-base "
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text
            className="mt-8 text-sm"
            style={{ fontFamily: Fonts.LATO_BOLD }}
          >
            Sign up with email
          </Text>
          <TouchableOpacity className="flex-row bg-white rounded-md items-center justify-center  py-2 mt-3">
            <Image
              source={require("../../assets/Google.png")}
              className="h-6 w-6"
              style={{ resizeMode: "contain" }}
            />

            <Text
              className="text-base ml-2"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
            >
              Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row bg-white rounded-md items-center justify-center  py-2 mt-3">
            <Image
              source={require("../../assets/Apple.png")}
              className="h-6 w-6"
              style={{ resizeMode: "contain" }}
            />

            <Text
              className="text-base ml-2"
              style={{ fontFamily: Fonts.LATO_REGULAR }}
            >
              Apple
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-between items-center mt-9 ">
            <TouchableOpacity>
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
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                SKIP LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
