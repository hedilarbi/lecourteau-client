import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Main/TabNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../services/UserServices";
import {
  selectUser,
  selectUserToken,
  setUser,
  setUserToken,
} from "../redux/slices/userSlice";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import SetupProfileScreen from "../screens/SetupProfileScreen";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigation from "./Auth/AuthNavigation";
import { StatusBar } from "expo-status-bar";
import { getRestaurantSettings } from "../services/RestaurantServices";
import { setSettings } from "../redux/slices/settingsSlice";

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();
  const userToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const getUserToken = async () => {
    let token;
    try {
      token = await getItemAsync("token");
    } catch (err) {}
    if (token) {
      getUserByToken(token)
        .then(async (response) => {
          if (response.status) {
            dispatch(setUser(response.data));
            dispatch(setUserToken(token));
          } else {
            await deleteItemAsync("token");
            dispatch(setUser({}));
            dispatch(setUserToken(null));
          }
        })
        .finally(async () => {
          await SplashScreen.hideAsync();
          setIsLoading(false);
        });
    } else {
      dispatch(setUser({}));
      dispatch(setUserToken(null));
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  const getSettings = async () => {
    getRestaurantSettings().then((response) => {
      if (response.status) {
        dispatch(setSettings(response.data));
      }
    });
  };

  useEffect(() => {
    getSettings();
  }, []);
  useEffect(() => {
    getUserToken();
  }, [userToken]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" translucent={false} backgroundColor="black" />
      <NavigationContainer>
        <RootStack.Navigator>
          {!userToken && (
            <RootStack.Screen
              name="Auth"
              component={AuthNavigation}
              options={{
                headerShown: false,
              }}
            />
          )}
          {user?.is_profile_setup === false ? (
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
    </>
  );
};

export default RootNavigation;
