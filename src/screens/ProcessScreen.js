import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../redux/slices/orderSlide";
import { createOrder } from "../services/OrderServices";
import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { clearBasket } from "../redux/slices/basketSlice";
import { setUser } from "../redux/slices/userSlice";
import { Fonts } from "../constants";
import FullLogoBlack from "../../assets/icons/FullLogoBlack.svg";
import SuccessModel from "../components/SuccessModel";
const ProcessScreen = () => {
  const order = useSelector(selectOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [showSuccessModel, setShowSuccessModel] = useState(false);

  const processOrder = async () => {
    setError(false);
    createOrder(order)
      .then((response) => {
        if (response?.status) {
          setShowSuccessModel(true);
          dispatch(setUser(response.data));
        } else {
          setError(true);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    processOrder();
  }, [refresh]);

  useEffect(() => {
    if (showSuccessModel) {
      // After 1 second, reset showSuccessModel to false
      const timer = setTimeout(() => {
        dispatch(clearBasket());
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        setShowSuccessModel(false);
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts before 1 second
    }
  }, [showSuccessModel]);
  return (
    <SafeAreaView className="bg-pr justify-center items-center flex-1">
      <SuccessModel visiblity={showSuccessModel} />
      <View className="items-center">
        <FullLogoBlack />
        {error ? (
          <View className="mt-3">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
              className="text-red-300"
            >
              Something Went Wrong
            </Text>
            <TouchableOpacity
              className="bg-pr rounded-md py-2 items-center flex-row  px-8  mt-3   "
              onPress={() => setRefresh((prev) => prev + 1)}
            >
              <AntDesign name="reload1" size={20} color="black" />
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                className="ml-2"
              >
                Refresh
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-base text-pr mt-4"
          >
            Traitement ...{" "}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

ProcessScreen.navigationOptions = {
  tabBarVisible: false, // This will hide the bottom tab bar
};

export default ProcessScreen;
