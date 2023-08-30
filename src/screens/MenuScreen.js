import { View, Text } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

import { Fonts } from "../constants";
import MenuItem from "../components/MenuItem";
import { selectBasket, selectBasketTotal } from "../redux/slices/basketSlice";

import useMenuData from "../hooks/useMenuData";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import Error from "../components/Error";

const MenuScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const basket = useSelector(selectBasket);
  const totalPrice = useSelector(selectBasketTotal);
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const filterMenuItems = (index, item) => {
    setSelectedItem(index);

    if (item.name === "All") {
      setFilteredMenuItemsList(menuItemsList);
      return null;
    }
    const newMenuItemList = menuItemsList.filter(
      (menuItem) => menuItem.category.name === item.name
    );
    setFilteredMenuItemsList(newMenuItemList);
  };

  const {
    menuCategories,
    filteredMenuItemsList,
    menuItemsList,
    setFilteredMenuItemsList,
    selectedItem,
    setSelectedItem,
    errors,
  } = useMenuData(setIsLoading, refresh);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      className={
        selectedItem === index
          ? "justify-center mr-6 border-b-2 border-pr"
          : "justify-center mr-6"
      }
      onPress={() => filterMenuItems(index, item)}
    >
      <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-lg">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }

  return (
    <SafeAreaView className="bg-bg flex-1">
      {(basket?.offers?.length > 0 ||
        basket?.items.length > 0 ||
        basket?.rewards.length > 0) && (
        <View className="absolute bottom-0 bg-transparent flex-row items-center px-2 w-full z-30 mb-4">
          <TouchableOpacity
            className="flex-1 bg-pr flex-row justify-between items-center px-10 py-3"
            onPress={() => navigation.navigate("Card")}
          >
            <View className="bg-[#AB7300] px-3 py-1">
              <Text
                style={{ fontFamily: Fonts.BEBAS_NEUE }}
                className="text-xl"
              >
                {basket.items.length +
                  basket.offers.length +
                  basket.rewards.length}
              </Text>
            </View>
            <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
              Items
            </Text>
            <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
              {totalPrice}$
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View className="pt-4 bg-white px-3">
        <FlatList
          horizontal
          data={menuCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
        />
      </View>
      <ScrollView className="px-2 py-4 ">
        {filteredMenuItemsList.map((item, index) => {
          const { name, image, description, prices, _id } = item;

          return (
            <MenuItem
              name={name}
              image={image}
              id={_id}
              description={description}
              prices={prices}
              key={_id}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
