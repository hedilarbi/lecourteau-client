import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen";
import FavoritesScreen from "../../screens/FavoritesScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import AddressesScreen from "../../screens/AddressesScreen";
import CreditCardsScreen from "../../screens/CreditCardsScreen";
import CompleteProfileScreen from "../../screens/CompleteProfileScreen";
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
        }}
        component={FavoritesScreen}
      />
      <ProfileStack.Screen
        name="Orders"
        options={{
          title: "My Orders",
        }}
        component={OrdersScreen}
      />
      <ProfileStack.Screen
        name="Addresses"
        options={{
          title: "My Addresses",
        }}
        component={AddressesScreen}
      />
      <ProfileStack.Screen
        name="CreditCards"
        component={CreditCardsScreen}
        options={{
          title: "My Credit Cards",
        }}
      />
      <ProfileStack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
        options={{
          title: "Complete Profile",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default MenuNavigation;
