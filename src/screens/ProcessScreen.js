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
import FullLogo from "../../assets/icons/FullLogo.svg";
import SuccessModel from "../components/SuccessModel";
import { setItemAsync } from "expo-secure-store";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    warning: "Something went wrong",
    button: "Refresh",
    status: "Processing Order ...",
  },
  fr: {
    warning: "Quelque chose s'est mal passé.",
    button: "Rafraichir",
    status: "Traitement de la commande ...",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
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
      .then(async (response) => {
        if (response?.status) {
          await setItemAsync("orderId", response.data.orderId);
          setShowSuccessModel(true);
          dispatch(setUser(response.data.user));
        } else {
          setError(true);
          console.log(response);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    processOrder();
  }, [refresh]);

  useEffect(() => {
    if (showSuccessModel) {
      const timer = setTimeout(() => {
        dispatch(clearBasket());
        navigation.popToTop();
        setShowSuccessModel(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModel]);
  return (
    <SafeAreaView className="bg-black justify-center items-center flex-1">
      <SuccessModel visiblity={showSuccessModel} />
      <View className="items-center">
        <FullLogo />
        {error ? (
          <View className="mt-3">
            <Text
              style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
              className="text-red-300"
            >
              {i18n.t("warning")}
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
                {i18n.t("button")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{ fontFamily: Fonts.LATO_REGULAR }}
            className="text-base text-pr mt-4"
          >
            {i18n.t("status")}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProcessScreen;
