import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Fonts } from "../constants";
import { selectUser } from "../redux/slices/userSlice";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { updateUserInfo } from "../services/UserServices";
import { ActivityIndicator } from "react-native";

const CompleteProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    if (email.length <= 0) {
      emailInput.current.setNativeProps({
        style: {
          borderColor: "red",
          borderWidth: 2,
        },
      });
      return null;
    }

    setIsLoading(true);
    updateUserInfo(user._id, name, email)
      .then((response) => {
        if (response.status) {
          dispatch(setUser(response.data));
        } else {
          Alert.alert("problem from complete profile");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 py-4 px-3 bg-bg">
      <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
        Setup Profile
      </Text>
      <View className="mt-3 flex-1">
        <View className="mx-auto h-20 w-20 rounded-full justify-center items-center bg-gray-400">
          {user.profile_img?.length > 0 ? (
            <Image
              source={{ uri: user.profile_img }}
              style={{ resizeMode: "cover", flex: 1, borderRadius: 100 }}
            />
          ) : (
            <Entypo name="camera" size={26} color="black" />
          )}
          <View className="absolute -bottom-3 flex-row justify-center z-40 ">
            <TouchableOpacity
              className="bg-black h-6 w-6 rounded-full items-center justify-center  "
              onPress={pickImage}
            >
              <Entypo name="plus" size={16} color="#F7A600" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-12">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Phone Number
          </Text>
          <Text
            className=" py-3 px-2 bg-white rounded-md mt-2 text-black"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
          >
            {user.phone_number}{" "}
          </Text>
        </View>
        <View className="mt-4">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Full Name*
          </Text>
          <TextInput
            placeholder={user.name}
            className=" py-2 px-2 bg-white rounded-md mt-2 text-black"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            onChangeText={(text) => setName(text)}
            ref={nameInput}
          />
        </View>

        <View className="mt-4 ">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}>
            Email*
          </Text>
          <TextInput
            className="py-2 px-2 bg-white rounded-md mt-2"
            style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
            placeholder={user.email}
            onChangeText={(text) => setEmail(text)}
            ref={emailInput}
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-pr items-center py-3 rounded-md"
        onPress={updateUser}
      >
        <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;
