import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Main/TabNavigation";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
