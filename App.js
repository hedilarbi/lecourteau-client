import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import RootNavigation from "./src/navigation/RootNavigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": require("./assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf"),

    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Light": require("./assets/fonts/Lato/Lato-Light.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <RootNavigation />
      </>
    </Provider>
  );
}
