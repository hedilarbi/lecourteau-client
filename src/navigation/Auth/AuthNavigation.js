import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../../screens/SignUpScreen";
import OtpScreen from "../../screens/OtpScreen";
import PhoneNumberScreen from "../../screens/PhoneNumberScreen";

const AuthNavigation = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
        options={{ title: "" }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
