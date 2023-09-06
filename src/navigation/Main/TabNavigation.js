import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RewardsScreen from "../../screens/RewardsScreen";
import LogoFocused from "../../../assets/icons/LogoFocused.svg";
import RewardFocused from "../../../assets/icons/RewardFocused.svg";
import Logo from "../../../assets/icons/Logo.svg";
import Reward from "../../../assets/icons/Reward.svg";
import { Feather, Ionicons } from "@expo/vector-icons";
import MenuNavigation from "./MenuNavigation";
import ProfileNavigation from "./ProfileNavigation";
import HomeNavigation from "./HomeNavigator";

import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../services/NotificationsServices";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { updateUserExpoToken } from "../../services/UserServices";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

const TabNavigation = () => {
  const MainTab = createBottomTabNavigator();

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        const data = notification.request.content.data;

        if (data && data.order_id) {
          navigation.navigate("ProfileNav", {
            screen: "Details",
            params: { id: data.order_id },
          });
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        if (data && data.order_id) {
          // If notification contains an orderId, navigate to OrderDetailsScreen
          navigation.navigate("ProfileNav", {
            screen: "Details",
            params: { id: data.order_id },
          });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={false}
      />
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? <LogoFocused /> : <Logo />;
                break;
              case "MenuNav":
                iconName = focused ? (
                  <Feather name="menu" size={28} color="#F7A600" />
                ) : (
                  <Feather name="menu" size={28} color="#827B7B" />
                );
                break;
              case "Rewards":
                iconName = focused ? <Reward /> : <RewardFocused />;
                break;

              case "ProfileNav":
                iconName = focused ? (
                  <Ionicons
                    name="ios-person-outline"
                    size={24}
                    color="#F7A600"
                  />
                ) : (
                  <Ionicons
                    name="ios-person-outline"
                    size={24}
                    color="#827B7B"
                  />
                );
                break;
            }

            return iconName;
          },
          tabBarActiveTintColor: "#F7A600",
          tabBarInactiveTintColor: "#827B7B",
          tabBarLabelStyle: {
            fontFamily: "BebasNeue-Regular",
          },
        })}
      >
        <MainTab.Screen
          name="Home"
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
        <MainTab.Screen
          name="MenuNav"
          component={MenuNavigation}
          options={{ headerShown: false, title: "Menu" }}
        />
        <MainTab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{ headerShown: false }}
        />

        <MainTab.Screen
          name="ProfileNav"
          component={ProfileNavigation}
          options={{ headerShown: false, title: "Profile" }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default TabNavigation;
