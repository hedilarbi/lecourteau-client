import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearUserToken, selectUser } from "../redux/slices/userSlice";
import { deleteItemAsync } from "expo-secure-store";
import DeleteWarning from "../components/DeleteWarning";
import { Fonts } from "../constants";
import ErrorModal from "../components/ErrorModal";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import ProfileFr from "../translation/fr/Profile";
import ProfileEn from "../translation/en/Profile";

const translation = {
  en: ProfileEn,
  fr: ProfileFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [isFail, setIsFail] = useState(false);
  const dispatch = useDispatch();
  const [showDeleteWarningModel, setShowDeleteWarningModel] = useState(false);

  useEffect(() => {
    if (isFail) {
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFail]);
  const logoutUser = async () => {
    try {
      await deleteItemAsync("token");
      dispatch(clearUserToken());
    } catch (err) {
      setIsFail(false);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
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
      <ErrorModal visiblity={isFail} />
      {showDeleteWarningModel && (
        <DeleteWarning
          id={user._id}
          setShowDeleteWarning={setShowDeleteWarningModel}
          text={{
            warning: i18n.t("delete_account_warning_text"),
            confirm: i18n.t("delete_account_confirm"),
            cancel: i18n.t("delete_account_cancel"),
          }}
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
              <Text style={{ fontFamily: Fonts.LATO_BOLD }}>
                {i18n.t("setup_profile_button")}
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
                {i18n.t("my_orders")}
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
                {i18n.t("my_favorites")}
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
                {i18n.t("my_addresses")}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("CreditCards")}
            >
              <AntDesign name="creditcard" size={22} color="black" />
              <Text
                className="text-sm ml-4"
                style={{ fontFamily: Fonts.LATO_BOLD }}
              >
                {i18n.t("my_cards")}
              </Text>
            </TouchableOpacity> */}
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
                {i18n.t("logout")}
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
                {i18n.t("delete_account")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
