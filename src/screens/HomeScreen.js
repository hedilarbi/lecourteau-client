import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants";
import News from "../components/News";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Menu from "../components/Menu";
import Offers from "../components/Offers";
import { selectBasket } from "../redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getCategories, getOffers } from "../services/FoodServices";

import {
  selectUser,
  selectUserAddress,
  setUserAddress,
} from "../redux/slices/userSlice";
import UserAddress from "../components/UserAddress";
import { getRestaurantSettings } from "../services/RestaurantServices";
import WarningBanner from "../components/WarningBanner";
import { setSettings } from "../redux/slices/settingsSlice";
import Map from "../components/Map";
import { ActivityIndicator } from "react-native";
import Error from "../components/Error";
import { registerForPushNotificationsAsync } from "../services/NotificationsServices";
import { updateUserExpoToken } from "../services/UserServices";
import ReviewModel from "../components/ReviewModel";
import { getItemAsync } from "expo-secure-store";
import { getOrder } from "../services/OrderServices";
import { GOOGLE_MAPS_API_KEY } from "@env";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import HomeFr from "../translation/fr/Home";
import HomeEn from "../translation/en/Home";
import useGetUserLocation from "../hooks/useGetUserLocation";

const translation = {
  en: HomeEn,
  fr: HomeFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
Location.setGoogleApiKey(GOOGLE_MAPS_API_KEY);

const HomeScreen = () => {
  const [showMap, setShowMap] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showWarningBanner, setShowWarningBanner] = useState(false);
  const basket = useSelector(selectBasket);
  const [isLoading, setIsLoading] = useState(true);

  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState(false);
  const [showReviewModel, setShowReviewModel] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const user = useSelector(selectUser);
  const { address ,location} = useSelector(selectUserAddress);
  
  
  const {locationError,locationLoading}=useGetUserLocation()
  useEffect(() => {
    
    if (Object.keys(user).length !== 0 ) {
      registerForPushNotificationsAsync().then(async (token) =>{
        
        if(token.data !== user.expo_token){
          
          updateUserExpoToken(user._id, token.data)
        }
      }
      );
    }
  }, []);
  
  const fetchData = async () => {
   
    setErrors(false);
  
    try {
      const [categoriesResponse, offersResponse, settingsResponse] =
        await Promise.all([
          getCategories(),
          getOffers(),
          getRestaurantSettings(),
        ]);
        
      if (categoriesResponse.status) {
        setCategories(categoriesResponse.data);
      } else {
        setErrors(true);
      }
      if (settingsResponse.status) {
        dispatch(setSettings(settingsResponse.data));

        if (
          settingsResponse.data.open === false ||
          settingsResponse.data.delivey === false
        ) {
          setShowWarningBanner(true);
        }
      } else {
        setErrors(true);
      }

      if (offersResponse.status) {
        setOffers(offersResponse.data);
      } else {
        setErrors(true);
      }
    } catch (error) {
      setErrors(true);
    } 
  };

  
  useEffect(() => {
    setIsLoading(true)
    fetchData();
    getLastOrder();
    setIsLoading(false)
  }, [refresh]);

  const retrieveOrderId = async () => {
    const id = await getItemAsync("orderId");
    return id;
  };

  const getLastOrder = async () => {
  
    const id = await retrieveOrderId();
    setOrderId(id);

    if (id) {
    
      getOrder(id).then((response) => {
        if (response.status) {
          if (
            response.data.status === "Delivered" &&
            response.data.review.status === false
          ) {
            setShowReviewModel(true);
          }
        }
      });
    }
  
  };

 

  if (isLoading || locationLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (errors) {
    return <Error setRefresh={setRefresh} />;
  }

  return (
    <SafeAreaView
      className={showMap ? "flex-1 bg-bg " : "flex-1 bg-bg  px-3 pt-4"}
    >
      <ReviewModel
        modalVisible={showReviewModel}
        setModalVisible={setShowReviewModel}
        orderId={orderId}
        text={{
          button: i18n.t("send"),
          placeHolder: i18n.t("comment"),
          title: i18n.t("review_title"),
        }}
      />
      {showWarningBanner && <WarningBanner />}
      {showMap ? (
        <Map setShowMap={setShowMap} />
      ) : (
        <View className="flex-1">
          {(basket?.offers?.length > 0 ||
            basket?.items.length > 0 ||
            basket?.rewards.length > 0) && (
            <TouchableOpacity
              className="bg-pr rounded-full p-4 absolute bottom-5 right-5 z-30"
              onPress={() => navigation.navigate("MenuNav", { screen: "Card" })}
            >
              <AntDesign name="shoppingcart" size={30} color="black" />
              <View className="absolute top-0 right-0 rounded-full bg-black h-5 w-5 items-center">
                <Text
                  className="text-sm text-white"
                  style={{ fontFamily: Fonts.LATO_BOLD }}
                >
                  {basket.items.length +
                    basket.offers.length +
                    basket.rewards.length}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <UserAddress
            setShowMap={setShowMap}
            address={address}
            text={i18n.t("current_location")}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <News
              text={{
                button: i18n.t("all_button"),
                title: i18n.t("new_section"),
              }}
            />

            <Menu
              categories={categories}
              text={{
                button: i18n.t("all_button"),
                title: i18n.t("explore_menu_section"),
              }}
            />

            <Offers
              offers={offers}
              text={{
                button: i18n.t("all_button"),
                title: i18n.t("offers_section"),
              }}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
