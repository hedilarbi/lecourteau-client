import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Fonts } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserAddress } from "../redux/slices/userSlice";

const EditOrderModal = ({
  isDetailsModalVisible,
  setIsDetailsModalVisible,
  address,
  text,
  addresses
}) => {
 
  const [addressesList, setAddressesList] = useState([]);
  const dispatch = useDispatch();
  
  const navigation = useNavigation();
  useEffect(() => {
    let list = [];
    addresses.map((item) => {
      if (item.address === address) {
        list.push({
          address: item.address,
          coords: item.coords,
          is_selected: true,
        });
      } else {
        list.push({
          address: item.address,
          coords: item.coords,
          is_selected: false,
        });
      }
    });

    setAddressesList(list);
  }, [address,addresses]);

  const selectAddress = (newAddress, newCoords) => {
    const newList = addressesList.map((item) => {
      if (item.address === newAddress) {
        return { address: newAddress, coords: newCoords, is_selected: true };
      } else {
        return {
          address: item.address,
          coords: newCoords,
          is_selected: false,
        };
      }
    });
    setAddressesList(newList);
    dispatch(
      setUserAddress({
        address: newAddress,
        location: {
          longitude: newCoords.longitude,
          latitude: newCoords.latitude,
        },
      })
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDetailsModalVisible}
      onRequestClose={() => setIsDetailsModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: Dimensions.get("window").height * 0.5, // Half of the screen height
          }}
          className="bg-white pb-3"
        >
          <View className="bg-white rounded-t-2xl ">
            <View className="px-3 my-3 flex-row items-center  justify-between ">
              <TouchableOpacity
                onPress={() => setIsDetailsModalVisible(false)}
                // Close the modal
              >
                <AntDesign name="close" size={28} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: Fonts.LATO_BOLD,
                  fontSize: 18,
                }}
              >
                {text.title}
              </Text>
              <View>
                <AntDesign name="close" size={28} color="white" />
              </View>
            </View>
          </View>
          <ScrollView className="flex-1">
            <Text
              className="text-sm px-3 my-3"
              style={{ fontFamily: Fonts.LATO_BOLD }}
            >
              {text.section}
            </Text>
            <View className="bg-white px-3 pb-3">
              <TouchableOpacity
                className=" flex-row justify-between items-center border-b border-gray-300 py-2 mt-2"
                onPress={() => {
                  setIsDetailsModalVisible(false);
                  navigation.navigate("SetAddress");
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.LATO_REGULAR,
                    fontSize: 14,
                  }}
                >
                  {text.button}
                </Text>
                <Entypo name="plus" size={18} color="black" />
              </TouchableOpacity>
            

              {addressesList.map((item, index) => {
                return (
                  <TouchableOpacity
                    className=" flex-row justify-between items-center  border-gray-300 py-2 mt-2 "
                    onPress={() => selectAddress(item.address, item.coords)}
                    key={index}
                    >
                    <Text
                      style={{
                        fontFamily: Fonts.LATO_REGULAR,
                        fontSize: 14,
                        width: "80%",
                      }}
                      numberOfLines={1}
                      >
                      {item.address}
                    </Text>
                    <View className="h-4 w-4 rounded-full border-pr border  justify-center items-center">
                      <View
                        className={
                          item.is_selected ? "bg-pr h-2 w-2 rounded-full" : ""
                        }
                        ></View>
                    </View>
                  </TouchableOpacity>
                );
              })}
         
            </View>
          </ScrollView>

          <TouchableOpacity
            className="bg-pr rounded-md items-center justify-center py-2  mx-2"
            onPress={() => setIsDetailsModalVisible(false)}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
              {text.close}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditOrderModal;
