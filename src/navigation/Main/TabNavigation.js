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

import { useNavigation } from "@react-navigation/native";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    home: "Home",
    rewards: "Rewards",
  },
  fr: {
    home: "Acceuil",
    rewards: "Récompense",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

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
          options={{ headerShown: false, title: i18n.t("home") }}
        />
        <MainTab.Screen
          name="MenuNav"
          component={MenuNavigation}
          options={{ headerShown: false, title: "Menu" }}
        />
        <MainTab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{ headerShown: false, title: i18n.t("rewards") }}
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
