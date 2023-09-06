import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { Fonts } from "../constants";
import {
  addToBasket,
  selectBasketItemWithUID,
  updateItemInBasket,
} from "../redux/slices/basketSlice";
import { getMenuItem } from "../services/FoodServices";
import Error from "../components/Error";
import DropDown from "../components/DropDown";

const CustomizeScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const [categorizedCustomization, setCategorizedCustomization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");

  const itemFromBasket =
    route.params.parent === "Card"
      ? useSelector(selectBasketItemWithUID(route.params.uid))
      : null;

  useEffect(() => {
    setErrors(false);
    setIsLoading(true);
    getMenuItem(route.params.id)
      .then((response) => {
        if (response?.status) {
          const customizations = response?.data?.customization || [];
          const CustomizationList = {};
          customizations.forEach((item) => {
            if (!CustomizationList[item.category.name]) {
              CustomizationList[item.category.name] = [];
            }
            if (route.params.parent === "Card") {
              if (
                itemFromBasket[0].customization.some(
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
          const list = response.data.prices.map((item) => item.size);
          setSizes(list);
          if (route.params.parent === "Card") {
            setPrice(itemFromBasket[0].price);
            setSize(itemFromBasket[0].size);
          } else {
            setPrice(response.data.prices[0].price);
            setSize(response.data.prices[0].size);
          }
          setMenuItem(response?.data);
        } else {
          setErrors(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    if (menuItem) {
      const selectedItem = menuItem?.prices?.find((item) => item.size === size);
      setPrice(selectedItem?.price);
    }
  }, [size]);

  const calculateTotalPrice = () => {
    let newPrice = price;
    selectedItems.map((item) => (newPrice += item.price));

    return newPrice;
  };

  const selectedItems = useMemo(() => {
    return Object.keys(categorizedCustomization).reduce((result, category) => {
      const elements = categorizedCustomization[category];
      const selectedItems = elements.filter(
        (element) => element.state === true
      );
      return [...result, ...selectedItems];
    }, []);
  }, [categorizedCustomization]);

  const addItemToBasket = () => {
    if (route.params.parent === "Menu") {
      dispatch(
        addToBasket({
          id: menuItem._id,
          name: menuItem.name,
          image: menuItem.image,
          price: calculateTotalPrice(),
          size: size,
          customization: selectedItems,
        })
      );

      navigation.goBack();
    } else {
      dispatch(
        updateItemInBasket({
          uid: route.params.uid,
          price: calculateTotalPrice(),
          size,
          customization: selectedItems,
        })
      );

      navigation.navigate("Card");
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
      }

      return updatedState;
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }
  return (
    <View className="flex-1 bg-bg">
      <ScrollView className="flex-1 ">
        <View className=" h-44 bg-gray-400">
          <Image
            source={{ uri: menuItem.image }}
            className="flex-1"
            style={{ resizeMode: "cover" }}
          />
          {/* <View className=" absolute bottom-4 left-0 flex-row items-center  px-3 border">
            <Text
              style={{ fontFamily: Fonts.BEBAS_NEUE }}
              className=" text-2xl text-pr"
            >
              {menuItem.name} :
              <Text
                style={{ fontFamily: Fonts.LATO_REGULAR }}
                className="text-sm text-gray-500"
              >
                {menuItem.description}
              </Text>
            </Text>
          </View> */}
        </View>

        <View className="flex-row items-center mt-3 px-3">
          <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-base">
            Choose Size
          </Text>
          <View className="ml-3  bg-white border-pr rounded-md">
            <DropDown size={size} setSize={setSize} sizes={sizes} />
          </View>
        </View>

        <Text
          style={{ fontFamily: Fonts.BEBAS_NEUE }}
          className="text-base mt-3 px-3"
        >
          Customization
        </Text>

        {Object.entries(categorizedCustomization).map(([key, toppings]) => {
          return (
            <View key={key} className="mt-2 px-3">
              <Text
                style={{ fontFamily: Fonts.LATO_BOLD }}
                className="text-sm capitalize"
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

      <View className="px-3 my-3 flex-row justify-between items-center">
        <Text className="text-base" style={{ fontFamily: Fonts.LATO_BOLD }}>
          Price
        </Text>
        <Text
          style={{ fontFamily: Fonts.LATO_BOLD }}
          className="text-sm text-gray-500  "
        >
          {calculateTotalPrice()} $
        </Text>
      </View>

      <TouchableOpacity
        className="bg-pr rounded-md items-center justify-center py-2 mx-3 mb-4"
        onPress={addItemToBasket}
      >
        <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
          {route.params.parent === "Menu" ? "Add To Card" : "Save"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomizeScreen;
