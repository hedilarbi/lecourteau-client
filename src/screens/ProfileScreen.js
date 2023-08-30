import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../redux/slices/userSlice";
import { deleteItemAsync } from "expo-secure-store";
import DeleteWarning from "../components/DeleteWarning";
import { Fonts } from "../constants";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [showDeleteWarningModel, setShowDeleteWarningModel] = useState(false);
  const logoutUser = async () => {
    try {
      await deleteItemAsync("token");
      dispatch(clearUser());
    } catch (err) {
      Alert.alert(err, "problem from setup profile");
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "SignUp" }],
      });
    }
  };

  if (!user || Object.keys(user).length === 0) {
    return (
      <View className="flex-1 bg-bg justify-center items-center">
        <Text
          style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          className="text-tgry"
        >
          You Need To Be Signed In
        </Text>
        <TouchableOpacity
          className="bg-pr rounded-md py-2 items-center mt-3 px-5"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-bg ">
      {showDeleteWarningModel && (
        <DeleteWarning
          id={user._id}
          setShowDeleteWarning={setShowDeleteWarningModel}
        />
      )}
      <View className="flex-1 p-3 pb-12">
        <View className="bg-white rounded-md p-5">
          <View>
            <View className="flex-row">
              <View className="bg-pr h-10 w-10 justify-center items-center rounded-md">
                {user?.profile_img ? (
                  <Image
                    source={{ uri: user?.profile_img }}
                    style={{ flex: 1, resizeMode: "cover" }}
                  />
                ) : (
                  <Text
                    className="text-xl"
                    style={{ fontFamily: Fonts.LATO_BOLD }}
                  >
                    {user?.email[0]}
                  </Text>
                )}
              </View>
              <View className="flex-1 justify-between ml-3">
                <Text
                  className="text-sm"
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                >
                  {user?.name}
                </Text>
                <Text
                  className="text-xs text-tgry"
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                >
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
          <View className=" items-center  mt-10 mb-3">
            <TouchableOpacity
              className=""
              onPress={() => navigation.navigate("CompleteProfile")}
            >
              <Text style={{ fontFamily: Fonts.LATO_BOLD }}>Setup Profile</Text>
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
            <TouchableOpacity
              className="flex-row items-center"
              onPress={logoutUser}
            >
              <MaterialCommunityIcons name="logout" size={22} color="black" />
              <Text
                className="text-sm ml-4"
                style={{ fontFamily: Fonts.LATO_BOLD }}
              >
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setShowDeleteWarningModel(true)}
            >
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
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
