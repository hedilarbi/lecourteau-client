import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../../screens/MenuScreen";
import CardScreen from "../../screens/CardScreen";
import CustomizeScreen from "../../screens/CustomizeScreen";
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
    </MenuStack.Navigator>
  );
};

export default MenuNavigation;
