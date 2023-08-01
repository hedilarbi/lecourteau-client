import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-bg p-3 pb-12">
      <View className="bg-white rounded-md p-5">
        <View>
          <View className="flex-row">
            <View className="bg-pr h-10 w-10 justify-center items-center rounded-md">
              <Text className="text-xl" style={{ fontFamily: Fonts.LATO_BOLD }}>
                H
              </Text>
            </View>
            <View className="flex-1 justify-between ml-3">
              <Text
                className="text-sm"
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                Hakim Dammak
              </Text>
              <Text
                className="text-xs text-tgry"
                style={{ fontFamily: Fonts.LATO_REGULAR }}
              >
                HakimDammak@gmail.com
              </Text>
            </View>
          </View>
        </View>
        <View className=" items-center  mt-10 mb-3">
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("CompleteProfile")}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }}>
              Complete Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className=" flex-1 bg-white rounded-md mt-3 p-5 justify-between">
        <View className="space-y-6">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("Orders")}
          >
            <AntDesign name="book" size={22} color="black" />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("Favorites")}
          >
            <AntDesign name="hearto" size={22} color="black" />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              My Favorites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("Addresses")}
          >
            <MaterialCommunityIcons
              name="notebook-edit-outline"
              size={22}
              color="black"
            />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              My Addresses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("CreditCards")}
          >
            <AntDesign name="creditcard" size={22} color="black" />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              My Cards
            </Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-6">
          <TouchableOpacity className="flex-row items-center">
            <MaterialCommunityIcons name="logout" size={22} color="black" />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <AntDesign name="delete" size={22} color="black" />
            <Text
              className="text-sm ml-4"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
