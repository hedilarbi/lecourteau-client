//android : 879272250209-b53otha4u3m89k4locgb5i5r7ueu0m5m.apps.googleusercontent.com
// ios : 879272250209-c3ashg2bv9aa1r0s392p3og5hlf5jthu.apps.googleusercontent.com
//web: 879272250209-3jrgcljrq13b10k1eh5fk67js9a6lsln.apps.googleusercontent.com


import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import RootNavigation from "./src/navigation/RootNavigation";
import { store } from "./src/redux/store";

import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLIC_KEY } from "@env";
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": require("./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf"),

    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Light": require("./assets/fonts/Lato/Lato-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
        <>
        <StatusBar style="dark" translucent={true} />
          <RootNavigation />
        </>
      </StripeProvider>
    </Provider>
  );
}
