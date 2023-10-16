import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";

import { Fonts } from "../constants";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    text: "Sorry, this item is out of stock",
    button: "Close",
  },
  fr: {
    text: "Désolé, cet article est en rupture de stock.",
    button: "Fermer",
  },
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const OutOfStockModal = ({ setShowOutOfStockModal, showOutOfStockModal }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showOutOfStockModal}
      onRequestClose={() => setShowOutOfStockModal(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: 40,
        }}
      >
        <View className="bg-white rounded-md p-3 items-center">
          <View className=" py-3 ">
            <Text
              style={{
                fontFamily: Fonts.LATO_BOLD,
                fontSize: 14,
              }}
            >
              {i18n.t("text")}
            </Text>
            <View className="flex-row justify-center ">
              <TouchableOpacity
                className="bg-pr rounded-md py-2 items-center mt-4 px-8"
                onPress={() => setShowOutOfStockModal(false)}
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

export default OutOfStockModal;
