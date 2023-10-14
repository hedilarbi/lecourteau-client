import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { I18n } from "i18n-js";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Localization from "expo-localization";
import * as Location from "expo-location";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { Fonts } from "../constants/";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { setUserInfo } from "../services/UserServices";
import ErrorModal from "../components/ErrorModal";
import { emailValidator } from "../utils/Validators";
import { formatDate } from "../utils/dateHandlers";
import { selectAuthData } from "../redux/slices/authSlice";
import SetupFr from "../translation/fr/SetupProfile";
import SetupEn from "../translation/en/SetupProfile";

const translation = {
  en: SetupEn,
  fr: SetupFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const SetupProfileScreen = () => {
  const dispatch = useDispatch();

  const authData = useSelector(selectAuthData);
  const { _id } = useSelector(selectUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date("2015-1-1"));

  const nameInput = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    if (authData.name) {
      setName(authData.name);
    }
    if (authData.email) {
      setEmail(authData.email);
    }
  }, []);

  useEffect(() => {
    if (isFail) {
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFail]);

  const handlePlaceSelect = async (data, details) => {
    try {
      const { description } = details;
      const response = await Location.geocodeAsync(description);

      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        //setSelectedCoordinate({ latitude, longitude });
        setAddress(description);
        setCoords({ latitude, longitude });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    if (name.length <= 0) {
      nameInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }
    const isEmailValid = emailValidator(email);
    if (isEmailValid) {
      emailInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }

    setIsLoading(true);

    setUserInfo(_id, name, email, address, coords, date)
      .then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
        } else {
          console.log(response);
          setIsFail(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);

      if (Platform.OS == "android") {
        setShowDatePicker(false);

        setDateOfBirth(formatDate(selectedDate));
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    setShowDatePicker(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 py-4 px-3 bg-bg">
        <ErrorModal visiblity={isFail} />

        <View className="mt-3 flex-1">
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
            {i18n.t("setup_profile_title")}
          </Text>
          {!authData.method && (
            <>
              <View className="mt-6">
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  {i18n.t("full_name")}
                </Text>
                <TextInput
                  placeholder="Full Name*"
                  className=" py-2 px-2 bg-white rounded-md mt-2 text-black"
                  style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  onChangeText={(text) => setName(text)}
                  ref={nameInput}
                />
              </View>
              <View className="mt-4 ">
                <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                  {i18n.t("email")}
                </Text>
                <TextInput
                  className="py-2 px-2 bg-white rounded-md mt-2"
                  style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  placeholder="Email*"
                  onChangeText={(text) => setEmail(text)}
                  ref={emailInput}
                />
              </View>
            </>
          )}

          <View className="mt-4 ">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              {i18n.t("date_of_birth")}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChangeDate}
                style={{ height: 120, marginTop: -10 }}
                maximumDate={new Date("2015-1-1")}
              />
            )}
            {showDatePicker && Platform.OS == "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around ",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  className="bg-gray-400 rounded-md items-center px-4 py-2"
                >
                  <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                    {i18n.t("cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmIOSDate}
                  className="bg-pr rounded-md items-center px-4 py-2"
                >
                  <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
                    {i18n.t("confirm")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!showDatePicker && (
              <Pressable onPress={() => setShowDatePicker(true)}>
                <TextInput
                  className="py-2 px-2 bg-white rounded-md mt-2 text-black"
                  style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  placeholder="25 / 10 / 1999"
                  value={dateOfBirth}
                  editable={false}
                  onPressIn={() => setShowDatePicker(true)}
                />
              </Pressable>
            )}
          </View>
          <View className="mt-4 flex-1">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
              {i18n.t("address")}
            </Text>
            <View className="bg-white rounded-md flex-row items-center  mt-2">
              <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details) => handlePlaceSelect(data, details)}
                query={{
                  key: `${GOOGLE_MAPS_API_KEY}`,
                  language: "en",
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="bg-pr items-center py-3 rounded-md"
          onPress={updateUser}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            {i18n.t("confirm_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SetupProfileScreen;
