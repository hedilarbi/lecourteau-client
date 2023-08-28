import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import OfferScreen from "../../screens/OfferScreen";
const HomeNavigation = () => {
  const MenuStack = createNativeStackNavigator();

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <MenuStack.Screen name="Offer" component={OfferScreen} />
    </MenuStack.Navigator>
  );
};

export default HomeNavigation;
