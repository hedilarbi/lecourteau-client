import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Main/TabNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/SignUpScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserByToken } from "../services/UserServices";
import { setUser } from "../redux/slices/userSlice";

const RootNavigation = ({ token }) => {
  const RootStack = createNativeStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      getUserByToken(token).then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
        }
      });
    }
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {token ? (
          <RootStack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
