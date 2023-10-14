import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen";
import FavoritesScreen from "../../screens/FavoritesScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import AddressesScreen from "../../screens/AddressesScreen";
import CreditCardsScreen from "../../screens/CreditCardsScreen";
import CompleteProfileScreen from "../../screens/CompleteProfileScreen";
import OrderDetailsScreen from "../../screens/OrderDetailsScreen";
import { Fonts } from "../../constants";
import { HeaderBackButton } from "@react-navigation/elements";
import SetAddressScreen from "../../screens/SetAddressScreen";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    my_orders: "My Orders",
    my_favorites: "My Favorites",
    my_addresses: "My Addresses",
    my_cards: "My Cards",
    setup_profile: "Setup Profile",
    order_details: "Order Details",
  },
  fr: {
    my_orders: "Mes commandes",
    my_favorites: "Mes favoris",
    my_addresses: "Mes adresses",
    my_cards: "Mes cartes",
    setup_profile: "Configurer le profil",
    order_details: "Détails de la commande",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
const MenuNavigation = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Favorites"
        options={{
          title: i18n.t("my_favorites"),

          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
        component={FavoritesScreen}
      />
      <ProfileStack.Screen
        name="Orders"
        options={{
          title: i18n.t("my_orders"),

          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
        component={OrdersScreen}
      />
      <ProfileStack.Screen
        name="Addresses"
        options={{
          title: i18n.t("my_addresses"),
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
        component={AddressesScreen}
      />
      <ProfileStack.Screen
        name="CreditCards"
        component={CreditCardsScreen}
        options={{
          title: i18n.t("my_cards"),
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
      <ProfileStack.Screen
        name="SetAddress"
        component={SetAddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
        options={{
          title: i18n.t("setup_profile"),
          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
        }}
      />
      <ProfileStack.Screen
        name="Details"
        component={OrderDetailsScreen}
        options={({ navigation }) => ({
          title: i18n.t("order_details"), // Optional: You can set a custom title

          headerTitleStyle: {
            fontFamily: Fonts.BEBAS_NEUE,
            fontSize: 20,
          },
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        })}
      />
    </ProfileStack.Navigator>
  );
};

export default MenuNavigation;
