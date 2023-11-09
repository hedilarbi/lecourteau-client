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
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import SetupProfileScreen from "../screens/SetupProfileScreen";
import * as SplashScreen from "expo-splash-screen";
import { Alert} from "react-native";
import AuthNavigation from "./Auth/AuthNavigation";
import { StatusBar } from "expo-status-bar";

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();
  const userToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const getUserToken = async () => {
    let token;
    try {
      token = await getItemAsync("token");
    } catch (err) {
     
    }
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
        });
    } else {
      dispatch(setUser({}));
      dispatch(setUserToken(null));
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    getUserToken();
  }, [userToken]);

  return (
    <>
     <StatusBar style="light" translucent={false} backgroundColor="black"  />
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
