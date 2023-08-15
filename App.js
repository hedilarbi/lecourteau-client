//android : 879272250209-b53otha4u3m89k4locgb5i5r7ueu0m5m.apps.googleusercontent.com
// ios : 879272250209-c3ashg2bv9aa1r0s392p3og5hlf5jthu.apps.googleusercontent.com
//web: 879272250209-3jrgcljrq13b10k1eh5fk67js9a6lsln.apps.googleusercontent.com

import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import RootNavigation from "./src/navigation/RootNavigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { getItemAsync } from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": require("./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf"),

    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Light": require("./assets/fonts/Lato/Lato-Light.ttf"),
  });
  const [userToken, setUserToken] = useState(null);

  const getUserToken = async () => {
    const token = await getItemAsync("token");
    setUserToken(token);
  };

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded && userToken) {
        await SplashScreen.hideAsync();
      }
    }
    getUserToken();
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <RootNavigation token={userToken} />
      </>
    </Provider>
  );
}
