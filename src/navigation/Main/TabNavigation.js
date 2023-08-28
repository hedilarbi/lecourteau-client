import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import RewardsScreen from "../../screens/RewardsScreen";
import LogoFocused from "../../../assets/icons/LogoFocused.svg";
import RewardFocused from "../../../assets/icons/RewardFocused.svg";
import Logo from "../../../assets/icons/Logo.svg";
import Reward from "../../../assets/icons/Reward.svg";
import { Feather, Ionicons } from "@expo/vector-icons";
import MenuNavigation from "./MenuNavigation";
import ProfileNavigation from "./ProfileNavigation";
import HomeNavigation from "./HomeNavigator";

const TabNavigation = () => {
  const MainTab = createBottomTabNavigator();

  return (
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
                <Ionicons name="ios-person-outline" size={24} color="#F7A600" />
              ) : (
                <Ionicons name="ios-person-outline" size={24} color="#827B7B" />
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
  );
};

export default TabNavigation;
