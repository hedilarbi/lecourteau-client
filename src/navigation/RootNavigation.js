import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Main/TabNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/SignUpScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../services/UserServices";
import {
  selectUser,
  selectUserToken,
  setUser,
  setUserToken,
} from "../redux/slices/userSlice";
import { getItemAsync } from "expo-secure-store";
import SetupProfileScreen from "../screens/SetupProfileScreen";
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();
  const userToken = useSelector(selectUserToken);
  const { is_profile_setup } = useSelector(selectUser);
  const dispatch = useDispatch();

  const getUserToken = async () => {
    let token;
    try {
      token = await getItemAsync("token");
    } catch (err) {
      Alert.alert("Something Went wrong");
    }
    if (token) {
      getUserByToken(token)
        .then((response) => {
          if (response.status) {
            dispatch(setUser(response.data));
            dispatch(setUserToken(token));
          } else {
            Alert.alert("Something Went wrong");
          }
        })
        .finally(async () => {
          await SplashScreen.hideAsync();
        });
    } else {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    getUserToken();
  }, [userToken]);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!userToken && (
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        {is_profile_setup === false ? (
          <RootStack.Screen
            name="SetupProfile"
            component={SetupProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
