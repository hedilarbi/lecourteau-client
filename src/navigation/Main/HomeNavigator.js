import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import OfferScreen from "../../screens/OfferScreen";
import { Fonts } from "../../constants";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { registerForPushNotificationsAsync } from "../../services/NotificationsServices";
import { useEffect } from "react";
import { updateUserExpoToken } from "../../services/UserServices";
const HomeNavigation = () => {
  const MenuStack = createNativeStackNavigator();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user && !user.expo_token) {
      registerForPushNotificationsAsync().then(async (token) =>
        updateUserExpoToken(user._id, token.data).then((response) => {
          console.log(response);
        })
      );
    }
  }, []);

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MenuStack.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
    </MenuStack.Navigator>
  );
};

export default HomeNavigation;
