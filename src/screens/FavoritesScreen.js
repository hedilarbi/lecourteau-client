import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import {
  getFavoritesList,
  getOrdersList,
  removeFromFavorites,
} from "../services/UserServices";
import { ActivityIndicator } from "react-native";
import OrderCard from "../components/OrderCard";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Fonts } from "../constants";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useSelector(selectUser);
  const [refresh, setRefresh] = useState(0);
  const fetchData = async () => {
    getFavoritesList(_id)
      .then((response) => {
        if (response.status) {
          setFavorites(response.data.favorites);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const deleteItem = async (id) => {
    setIsLoading(true);
    removeFromFavorites(_id, id)
      .then((response) => {
        if (response.status) {
          setRefresh(refresh + 1);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View className="flex-1 py-4 px-2 bg-bg">
      {favorites.length != 0 ? (
        <ScrollView className="flex-1 ">
          {favorites.map((item) => {
            return (
              <View
                className="bg-white p-2 rounded-md flex-row items-center justify-between"
                key={item._id}
              >
                <Image
                  source={{ uri: item.image }}
                  className="h-8 w-8 rounded-full"
                  style={{ resizeMode: "cover" }}
                />
                <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => deleteItem(item._id)}>
                  <Text
                    className="text-red-400"
                    style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}
                  >
                    remove item
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white justify-center items-center rounded-md">
          <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
            Vide
          </Text>
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;
