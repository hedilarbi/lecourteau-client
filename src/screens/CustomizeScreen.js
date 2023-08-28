import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Fonts } from "../constants";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemWithUID,
  selectBasketItemsWithID,
  updateItemInBasket,
} from "../redux/slices/basketSlice";
import { getMenuItem } from "../services/FoodServices";
import Error from "../components/Error";
const CustomizeScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const [menuItem, setMenuItem] = useState([]);
  const [categorizedCustomization, setCategorizedCustomization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let itemFromBasket = null;
  if (route.params.parent === "Card") {
    itemFromBasket = useSelector(selectBasketItemWithUID(route.params.uid));
  }

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
          setMenuItem(response?.data);
        } else {
          setErrors(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  const addItemToBasket = () => {
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
      let newPrice = route.params.price;
      selectedItems.map((item) => (newPrice += item.price));
      dispatch(
        addToBasket({
          id: menuItem._id,
          name: menuItem.name,
          image: menuItem.image,
          price: newPrice,
          size: route.params.size,
          customization: selectedItems,
        })
      );

      navigation.goBack();
    } else {
      let newPrice = route.params.price;
      selectedItems.map((item) => (newPrice += item.price));
      dispatch(
        updateItemInBasket({
          uid: route.params.uid,
          price: newPrice,
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
      } else {
        console.error("Element not found!");
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
      <View className=" h-44 bg-gray-400">
        <Image
          source={{ uri: menuItem.image }}
          className="flex-1"
          style={{ resizeMode: "cover" }}
        />
      </View>
      <Text
        style={{ fontFamily: Fonts.LATO_BOLD }}
        className="px-3 mt-3 text-base"
      >
        {menuItem.name}
      </Text>
      <ScrollView className="flex-1 p-3">
        {Object.entries(categorizedCustomization).map(([key, toppings]) => {
          return (
            <View key={key}>
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

      <TouchableOpacity
        className="bg-pr rounded-md items-center justify-center py-3 mx-3 mb-4"
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
