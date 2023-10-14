import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../constants";
import { useNavigation } from "@react-navigation/native";
const WarningModel = ({ setShowWarningModel, showWarningModel, text }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
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
              You Can't proceed without being logged in
            </Text>
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="bg-pr rounded-md py-3 items-center mt-4 px-8"
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  Sign In
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
