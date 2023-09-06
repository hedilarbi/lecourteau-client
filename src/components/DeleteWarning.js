import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import SuccessModel from "./SuccessModel";
import { Fonts } from "../constants";
import { deleteUser } from "../services/UserServices";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearUser } from "../redux/slices/userSlice";
import { deleteItemAsync } from "expo-secure-store";
import ErrorModal from "./ErrorModal";

const DeleteWarning = ({ id, setShowDeleteWarning }) => {
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const deleteFromList = async (id) => {
    await deleteItemAsync("token");
    setIsLoading(true);
    deleteUser(id)
      .then((response) => {
        if (response.status) {
          setShowSuccessModel(true);
        } else {
          setShowFailModal(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (showSuccessModel) {
      // After 1 second, reset showSuccessModel to false

      const timer = setTimeout(() => {
        dispatch(clearUser());
        setShowSuccessModel(false);
        setShowDeleteWarning(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "SignUp" }],
        });
      }, 3000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts before 1 second
    }

    if (showFailModal) {
      const timer = setTimeout(() => {
        setShowFailModal(flase);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModel, showFailModal]);

  return (
    <View style={styles.container}>
      <SuccessModel visiblity={showSuccessModel} />
      <ErrorModal visiblity={showFailModal} />
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            left: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <ActivityIndicator size={"large"} color="black" />
        </View>
      )}
      <View style={styles.model}>
        <View style={styles.titleContainer}>
          <AntDesign name="exclamationcircle" size={32} color="#FF0707" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Delete Warning</Text>
            <Text style={styles.subTitle}>
              Are you sure to delete your account?
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setDeleteWarningModelState(false)}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => deleteFromList(id)}
          >
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteWarning;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(50,44,44,0.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  model: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 20,
  },
  title: {
    fontFamily: Fonts.LATO_BOLD,
    fontSize: 16,
  },
  subTitle: {
    fontFamily: Fonts.LATO_REGULAR,
    fontSize: 12,
    marginTop: 5,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  cancelBtn: {
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#6B5959",
    color: "white",
  },
  confirmBtn: {
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#FF0707",
  },
  btnText: {
    fontFamily: Fonts.LATO_REGULAR,
    fontSize: 16,
    color: "white",
  },
});
