import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getOffer } from "../services/OfferServices";
import { Fonts } from "../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { addOfferToBasket } from "../redux/slices/basketSlice";
import Error from "../components/Error";

const OfferScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const fetchData = async () => {
    setErrors(false);
    setIsLoading(true);
    getOffer(id)
      .then((response) => {
        if (response.status) {
          setOffer(response.data);
        } else {
          setErrors(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const addToBasket = () => {
    dispatch(addOfferToBasket(offer));
    navigation.goBack();
  };

  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }

  return (
    <View className="flex-1 pb-3">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color="black" />
        </View>
      ) : (
        <>
          <View className="w-full h-48">
            <Image
              source={{ uri: offer.image }}
              style={{ flex: 1, resizeMode: "cover" }}
            />
          </View>
          <Text
            className="mx-3 mt-3"
            style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}
          >
            {offer.name}
          </Text>
          <Text
            className="mx-3 mt-3"
            style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}
          >
            Items:
          </Text>
          <ScrollView className="flex-1">
            {offer.items?.map((item) => {
              return (
                <View
                  key={item._id}
                  className="flex-row items-center justify-between mx-3 my-2 bg-white rounded-md py-2 px-3"
                >
                  <View className="h-9 w-9">
                    <Image
                      source={{ uri: item.item.image }}
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        borderRadius: 100,
                      }}
                    />
                  </View>
                  <Text>{item.item.name}</Text>
                  <Text>{item.quantity}</Text>
                </View>
              );
            })}
          </ScrollView>
          {/* <Text>Customization</Text>
          <ScrollView>
            {offer.customizations.map((item)=>(
              <View></View>
            ))}
          </ScrollView> */}
          <View className="flex-row justify-between items-center mx-3">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              Price:
            </Text>
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}
              className="text-tgry"
            >
              {offer.price} $
            </Text>
          </View>
          <TouchableOpacity
            className="bg-pr rounded-md py-3 items-center mt-5 mx-3"
            onPress={addToBasket}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              Add To Card
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OfferScreen;
