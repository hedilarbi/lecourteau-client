import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants";
import { useNavigation } from "@react-navigation/native";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    text: "You can't proceed without being logged in",
    button: "Sign In",
  },
  fr: {
    text: "Vous ne pouvez pas continuer sans être connecté",
    button: "Se connecter",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
const WarningModel = ({ setShowWarningModel, showWarningModel }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showWarningModel}
      onRequestClose={() => setShowWarningModel(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 20,
        }}
      >
        <View className="bg-white rounded-md p-2">
          <TouchableOpacity
            className="self-end"
            onPress={() => setShowWarningModel(false)}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className="px-5 py-3 mt-3">
            <Text
              style={{
                fontFamily: Fonts.LATO_REGULAR,
                fontSize: 14,
              }}
            >
              {i18n.t("text")}
            </Text>
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="bg-pr rounded-md py-3 items-center mt-4 px-8"
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  {i18n.t("button")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModel;
