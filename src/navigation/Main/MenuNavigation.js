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
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    cart: "Cart",
    checkout: "Checkout",
    customize: "Customize",
  },
  fr: {
    cart: "Panier",
    checkout: "Paiement",
    customize: "Personnaliser",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
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
          title: i18n.t("cart"), // Optional: You can set a custom title

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
        options={({ navigation }) => ({
          title: i18n.t("customize"), // Optional: You can set a custom title

          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },

          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          ),
        })}
      />
      <MenuStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: i18n.t("checkout"),
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
