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
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import {
  addOfferToBasket,
  selectBasketOfferWithUID,
  updateOfferInBasket,
} from "../redux/slices/basketSlice";
import Error from "../components/Error";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translation = {
  en: {
    items: "Items",
    customization: "Customization",
    price: "Price",
  },
  fr: {
    items: "Articles",
    customization: "Personnaliser",
    price: "Prix",
  },
};
const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const OfferScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const [categorizedCustomization, setCategorizedCustomization] = useState();

  let itemFromBasket = null;
  if (route.params.parent === "Card") {
    itemFromBasket = useSelector(selectBasketOfferWithUID(route.params.uid));
  }
  const calculateTotalPrice = () => {
    const selectedItems = Object.keys(categorizedCustomization).reduce(
      (result, category) => {
        const elements = categorizedCustomization[category];
        const selectedItems = elements.filter(
          (element) => element.state === true
        );
        return [...result, ...selectedItems];
      },
      []
    );

    let newPrice = offer.price;
    selectedItems.map((item) => (newPrice += item.price));

    return newPrice;
  };
  const fetchData = async () => {
    setErrors(false);
    setIsLoading(true);
    getOffer(id)
      .then((response) => {
        if (response.status) {
          setOffer(response.data);

          const customizations = response?.data?.customizations || [];
          const CustomizationList = {};
          customizations.forEach((item) => {
            if (!CustomizationList[item.category.name]) {
              CustomizationList[item.category.name] = [];
            }
            if (route.params.parent === "Card") {
              if (
                itemFromBasket[0].customizations.some(
                  (i) => i.name === item.name
                )
              ) {
                CustomizationList[item.category.name].push({
                  ...item,
                  state: true,
                });
              } else {
                CustomizationList[item.category.name].push({
                  ...item,
                  state: false,
                });
              }
            } else {
              CustomizationList[item.category.name].push({
                ...item,
                state: false,
              });
            }
          });

          setCategorizedCustomization(CustomizationList);
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
    const selectedItems = Object.keys(categorizedCustomization).reduce(
      (result, category) => {
        const elements = categorizedCustomization[category];
        const selectedItems = elements.filter(
          (element) => element.state === true
        );
        return [...result, ...selectedItems];
      },
      []
    );
    if (route.params.parent === "Menu") {
      dispatch(
        addOfferToBasket({
          id: offer._id,
          name: offer.name,
          image: offer.image,
          price: calculateTotalPrice(),

          customizations: selectedItems,
          items: offer.items,
        })
      );

      navigation.goBack();
    } else {
      dispatch(
        updateOfferInBasket({
          uid: route.params.uid,
          price: calculateTotalPrice(),

          customizations: selectedItems,
        })
      );

      navigation.navigate("MenuNav", { screen: "Card" });
    }
  };
  const handleCustomizationChange = (categoryName, itemId) => {
    setCategorizedCustomization((prevState) => {
      const updatedState = { ...prevState };

      const categoryArray = updatedState[categoryName];

      const elementIndex = categoryArray.findIndex(
        (element) => element._id === itemId
      );

      if (elementIndex !== -1) {
        categoryArray[elementIndex].state = !categoryArray[elementIndex].state;
      } else {
        console.error("Element not found!");
      }

      return updatedState;
    });
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
            {i18n.t("items")}:
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
                  <Text>{item.size}</Text>
                  <Text>{item.quantity}</Text>
                </View>
              );
            })}
          </ScrollView>
          <Text
            style={{ fontFamily: Fonts.LATO_BOLD }}
            className="text-base px-3"
          >
            {i18n.t("customization")}
          </Text>
          <ScrollView>
            {Object.entries(categorizedCustomization).map(([key, toppings]) => {
              return (
                <View key={key} className="mt-2 px-3">
                  <Text
                    style={{ fontFamily: Fonts.BEBAS_NEUE }}
                    className="text-base"
                  >
                    {key}
                  </Text>
                  {toppings.map((topping) => {
                    return (
                      <View
                        className="bg-white flex-row items-center my-2 px-2 py-3 rounded-md"
                        key={topping._id}
                      >
                        <View className="flex-1 flex-row items-center ">
                          <View className="h-8 w-8 rounded-full">
                            <Image
                              source={{ uri: topping.image }}
                              className="flex-1 rounded-full"
                              style={{ resizeMode: "cover" }}
                            />
                          </View>
                          <Text
                            style={{ fontFamily: Fonts.LATO_REGULAR }}
                            className="text-sm ml-3"
                          >
                            {topping.name}
                          </Text>
                          {topping.price > 0 && (
                            <Text
                              style={{ fontFamily: Fonts.LATO_REGULAR }}
                              className="text-sm text-tgry ml-3"
                            >
                              {topping.price} $
                            </Text>
                          )}
                        </View>
                        {topping.state === false ? (
                          <TouchableOpacity
                            className="border border-pr rounded-full h-6 w-6 justify-self-end"
                            onPress={() =>
                              handleCustomizationChange(
                                topping.category.name,
                                topping._id
                              )
                            }
                          ></TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            className="justify-center items-center h-6 w-6 bg-pr justify-self-end rounded-full"
                            onPress={() =>
                              handleCustomizationChange(
                                topping.category.name,
                                topping._id
                              )
                            }
                          >
                            <Entypo name="check" size={12} color="black" />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
          <View className="flex-row justify-between items-center mx-3">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              {i18n.t("price")}:
            </Text>
            <Text
              style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}
              className="text-tgry"
            >
              {calculateTotalPrice()} $
            </Text>
          </View>
          <TouchableOpacity
            className="bg-pr rounded-md py-3 items-center mt-5 mx-3"
            onPress={addToBasket}
          >
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              {route.params.parent === "Card" ? "Save" : "Add To Card"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OfferScreen;
