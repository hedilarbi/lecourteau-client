import React, { useEffect, useState } from "react";
import {
  Alert,
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
import * as Google from "expo-auth-session/providers/google";
import { createUser } from "../services/UserServices";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { setItemAsync } from "expo-secure-store";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "879272250209-b53otha4u3m89k4locgb5i5r7ueu0m5m.apps.googleusercontent.com",
    iosClientId:
      "879272250209-c3ashg2bv9aa1r0s392p3og5hlf5jthu.apps.googleusercontent.com",
    expoClientId:
      "879272250209-3jrgcljrq13b10k1eh5fk67js9a6lsln.apps.googleusercontent.com",
  });

  const getUserData = async () => {
    if (!accessToken) {
      const result = await promptAsync({
        useProxy: true,
        showInRecents: true,
      });

      if (result.type === "success") {
        // If the user successfully logged in, set the accessToken and make the API call
        setAccessToken(result.authentication.accessToken);

        await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${result.authentication.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    } else {
      await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    }
  };

  const saveUserToken = async (token) => {
    await setItemAsync("token", token);
  };

  const sendOtp = async () => {
    createUser(phoneNumber).then((response) => {
      if (response.status) {
        saveUserToken(response.data.token);
        dispatch(setUser(response.data.response));
        navigation.navigate("Main");
      } else {
        Alert.alert(response.message);
      }
    });
  };

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
          <TouchableOpacity
            className="flex-row bg-white rounded-md items-center justify-center  py-2 mt-3"
            onPress={() => getUserData()}
          >
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
