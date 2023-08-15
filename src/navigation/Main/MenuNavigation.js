import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../../screens/MenuScreen";
import CardScreen from "../../screens/CardScreen";
import CustomizeScreen from "../../screens/CustomizeScreen";
import CheckoutScreen from "../../screens/CheckoutScreen";
import PaiementScreen from "../../screens/PaiementScreen";
import ProcessScreen from "../../screens/ProcessScreen";
const MenuNavigation = () => {
  const MenuStack = createNativeStackNavigator();

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerShown: false,
        }}
      />
      <MenuStack.Screen name="Card" component={CardScreen} />
      <MenuStack.Screen name="Customize" component={CustomizeScreen} />
      <MenuStack.Screen name="Checkout" component={CheckoutScreen} />
      <MenuStack.Screen name="Paiement" component={PaiementScreen} />
      <MenuStack.Screen
        name="Process"
        component={ProcessScreen}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
};

export default MenuNavigation;
