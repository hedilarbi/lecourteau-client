import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../screens/HomeScreen";
import MenuScreen from "../../screens/MenuScreen";
import RewardsScreen from "../../screens/RewardsScreen";
import DealsScreen from "../../screens/DealsScreen";
import ProfileScreen from "../../screens/ProfileScreen";

import LogoFocused from "../../../assets/icons/LogoFocused.svg";
import DealsFocused from "../../../assets/icons/DealsFocused.svg";
import RewardFocused from "../../../assets/icons/RewardFocused.svg";

import Logo from "../../../assets/icons/Logo.svg";
import Deals from "../../../assets/icons/Deals.svg";
import Reward from "../../../assets/icons/Reward.svg";
import { Feather, Ionicons } from "@expo/vector-icons";
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
            case "Menu":
              iconName = focused ? (
                <Feather name="menu" size={28} color="#F7A600" />
              ) : (
                <Feather name="menu" size={28} color="#827B7B" />
              );
              break;
            case "Rewards":
              iconName = focused ? <Reward /> : <RewardFocused />;
              break;
            case "Deals":
              iconName = focused ? <Deals /> : <DealsFocused />;
              break;
            case "Profile":
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
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Deals"
        component={DealsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
};

export default TabNavigation;
