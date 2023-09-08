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
          title: "My Favorites",

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
          title: "My Orders",

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
          title: "My Addresses",
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
          title: "My Credit Cards",
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
          title: "Setup Profile",
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
          title: "Order Details", // Optional: You can set a custom title

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
