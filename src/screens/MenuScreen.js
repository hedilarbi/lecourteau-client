import { View, Text } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { Fonts } from "../constants";
import MenuItem from "../components/MenuItem";
import { selectBasket, selectBasketTotal } from "../redux/slices/basketSlice";

import useMenuData from "../hooks/useMenuData";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import Error from "../components/Error";
import { selectUser } from "../redux/slices/userSlice";

import MenuFr from "../translation/fr/Menu";
import MenuEn from "../translation/en/Menu";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { RefreshControl } from "react-native";
import { selectRestaurant } from "../redux/slices/settingsSlice";

const translation = {
  en: MenuEn,
  fr: MenuFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const MenuScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const basket = useSelector(selectBasket);
  const totalPrice = useSelector(selectBasketTotal);
  const { favorites } = useSelector(selectUser);
  const restaurant = useSelector(selectRestaurant);

  const [refresh, setRefresh] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const filterMenuItems = (index, item) => {
    setSelectedItem(index);

    if (item.name === "Menu") {
      setFilteredMenuItemsList(menuItemsList);
    } else if (item.name === "Favorites" || item.name === "Favoris") {
      const list = menuItemsList.filter((item) =>
        favorites.includes(item.menuItem._id)
      );

      setFilteredMenuItemsList(list);
    } else {
      const newMenuItemList = menuItemsList.filter(
        (menuItem) => menuItem.menuItem.category.name === item.name
      );

      setFilteredMenuItemsList(newMenuItemList);
    }
  };

  const {
    menuCategories,
    filteredMenuItemsList,
    menuItemsList,
    setFilteredMenuItemsList,
    selectedItem,
    setSelectedItem,
    errors,
  } = useMenuData(setIsLoading, refresh, restaurant._id);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      className={
        selectedItem === index
          ? "justify-center mr-6 border-b-4 border-pr"
          : "justify-center mr-6"
      }
      onPress={() => filterMenuItems(index, item)}
    >
      <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
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
        <View className="absolute bottom-0 bg-transparent flex-row items-center px-2 w-full z-30 mb-2">
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
              {i18n.t("basket_button_text")}
            </Text>
            <Text style={{ fontFamily: Fonts.BEBAS_NEUE }} className="text-xl">
              {totalPrice}$
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isProcessing && (
        <View
          className="absolute top-0 left-0 justify-center items-center h-full w-full z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <ActivityIndicator size="large" color="#F7A600" />
        </View>
      )}
      <View className="pt-6 bg-white px-3">
        <FlatList
          horizontal
          data={menuCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
        />
      </View>
      {filteredMenuItemsList.length > 0 ? (
        <FlatList
          data={filteredMenuItemsList}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => setRefresh((prev) => prev + 1)}
            />
          }
          renderItem={({ item }) => (
            <MenuItem
              name={item.menuItem.name}
              image={item.menuItem.image}
              id={item.menuItem._id}
              description={item.menuItem.description}
              prices={item.menuItem.prices}
              key={item.menuItem._id}
              is_available={item.availability}
              setIsLoading={setIsProcessing}
              text={{
                customize: i18n.t("customize_button"),
                size: i18n.t("choose_size"),
                stock: i18n.t("stock"),
              }}
            />
          )}
          keyExtractor={(item) => item.menuItem._id}
          contentContainerStyle={{
            paddingHorizontal: 2,
            paddingVertical: 4,
            paddingBottom: 56,
          }}
        />
      ) : (
        <View className="p-2 rounded-md justify-center items-center flex-1 bg-white">
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-base">
            Vide
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;
