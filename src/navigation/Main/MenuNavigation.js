import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../../screens/MenuScreen";
import CardScreen from "../../screens/CardScreen";
import CustomizeScreen from "../../screens/CustomizeScreen";
import CheckoutScreen from "../../screens/CheckoutScreen";
import PaiementScreen from "../../screens/PaiementScreen";
import ProcessScreen from "../../screens/ProcessScreen";
import { HeaderBackButton } from "@react-navigation/elements";
import { Fonts } from "../../constants";
import SetAddressScreen from "../../screens/SetAddressScreen";
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
      <MenuStack.Screen
        name="Card"
        component={CardScreen}
        options={({ navigation }) => ({
          title: "Cart", // Optional: You can set a custom title

          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },

          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate("Menu");
              }}
            />
          ),
        })}
      />
      <MenuStack.Screen
        name="SetAddress"
        component={SetAddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <MenuStack.Screen
        name="Customize"
        component={CustomizeScreen}
        options={{
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
      <MenuStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
      <MenuStack.Screen
        name="Paiement"
        component={PaiementScreen}
        options={{
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
      <MenuStack.Screen
        name="Process"
        component={ProcessScreen}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
};

export default MenuNavigation;
