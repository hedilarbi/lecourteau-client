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
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/slices/basketSlice";

import useMenuData from "../hooks/useMenuData";

const MenuScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const basket = useSelector(selectBasketItems);
  const totalPrice = useSelector(selectBasketTotal);

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
  } = useMenuData();

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

  return (
    <SafeAreaView className="bg-bg flex-1">
      <View className="flex flex-row justify-end py-2 bg-white px-3">
        <MaterialCommunityIcons name="magnify" size={28} color="black" />
      </View>
      {basket.length > 0 && (
        <View className="absolute bottom-0 bg-transparent flex-row items-center px-3 w-full z-30 mb-4">
          <TouchableOpacity
            className="flex-1 bg-pr flex-row justify-between items-center px-10 py-4"
            onPress={() => navigation.navigate("Card")}
          >
            <View className="bg-[#AB7300] px-3 py-1">
              <Text
                style={{ fontFamily: Fonts.BEBAS_NEUE }}
                className="text-xl"
              >
                {basket.length}
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
      <View className="pt-4 bg-white px-1">
        <FlatList
          horizontal
          data={menuCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
        />
      </View>
      <ScrollView className="px-1 py-4 ">
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
