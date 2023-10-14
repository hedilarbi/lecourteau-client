import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Fonts } from "../constants";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserAddress } from "../redux/slices/userSlice";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { selectSettings } from "../redux/slices/settingsSlice";
import { selectBasketTotal } from "../redux/slices/basketSlice";
import LogoFocused from "../../assets/icons/LogoFocused.svg";

import { setOrderTypeAndAddress } from "../redux/slices/orderSlide";
import { useNavigation } from "@react-navigation/native";

import EditOrderModal from "../components/EditOrderModal";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { getPaymentIntentClientSecret } from "../services/PaymentServices";
import PayementSuccessModel from "../components/PayementModels/PayementSuccessModel";
import PayementFailedModel from "../components/PayementModels/PayementFailedModel";
import { GOOGLE_MAPS_API_KEY } from "@env";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import CheckoutFr from "../translation/fr/Checkout";
import CheckoutEn from "../translation/en/Checkout";

const translation = {
  en: CheckoutEn,
  fr: CheckoutFr,
};

const i18n = new I18n(translation);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const CheckoutScreen = () => {
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const { location, address } = useSelector(selectUserAddress);
  const [total, setTotal] = useState(0);
  const [showPayementSuccessModel, setShowPayementSuccessModel] =
    useState(false);
  const [showPayementFailModel, setShowPayementFailModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { delivery_fee } = useSelector(selectSettings);
  const subTotal = useSelector(selectBasketTotal);
  const tps = (subTotal * 5) / 100;
  const tvq = (subTotal * 9.975) / 100;

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const { email } = useSelector(selectUser);

  const dispatch = useDispatch();

  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: "Marker 1",
      coordinate: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    },
    {
      id: 2,
      title: "Marker 2",
      coordinate: { latitude: 46.302301400000005, longitude: -72.6610984 },
    },
  ]);

  const cardInputRef = useRef(null);
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  };
  const navigation = useNavigation();

  const processOrder = async () => {
    if (!cardDetails?.complete || !email) {
      // Alert.alert("Please enter Complete card details and Email");
      cardInputRef.current.focus();
      return;
    }
    const billingDetails = {
      email: email,
    };
    setIsLoading(true);

    getPaymentIntentClientSecret(total.toFixed(2) * 100).then(
      async (response) => {
        if (response.status) {
          const { clientSecret, error } = response.data;
          if (error) {
            setErrorMessage("Enable to process payement");
            setShowPayementFailModel(true);
            setIsLoading(false);
          } else {
            const { paymentIntent, error } = await confirmPayment(
              clientSecret,
              {
                paymentMethodType: "Card",
              }
            );
            if (error) {
              setErrorMessage(error.message);
              setShowPayementFailModel(true);
              setIsLoading(false);
            } else if (paymentIntent) {
              setIsLoading(false);
              setShowPayementSuccessModel(true);
            }
          }
        }
      }
    );
  };
  useEffect(() => {
    if (deliveryMode === "delivery") {
      setTotal(delivery_fee + parseFloat(subTotal) + tps + tvq);
    } else {
      setTotal(parseFloat(subTotal) + tps + tvq);
    }
  }, [deliveryMode]);
  useEffect(() => {
    if (showPayementFailModel) {
      const timer = setTimeout(() => {
        setShowPayementFailModel(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showPayementFailModel]);
  useEffect(() => {
    if (showPayementSuccessModel) {
      const timer = setTimeout(() => {
        dispatch(
          setOrderTypeAndAddress({
            type: deliveryMode,
            address,
            coords: location,
            total: total.toFixed(2),
          })
        );
        navigation.navigate("Process");
        setShowPayementSuccessModel(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showPayementSuccessModel]);

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 8,
        }}
      >
        {isLoading && (
          <View
            className="absolute w-full h-full top-0 left-0 justify-center items-center z-20"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <ActivityIndicator size="large" color="#F7A600" />
          </View>
        )}
        <PayementSuccessModel
          visiblity={showPayementSuccessModel}
          text={i18n.t("payement_success_text")}
        />
        <PayementFailedModel
          visiblity={showPayementFailModel}
          message={errorMessage}
          text={i18n.t("payement_failed_text")}
        />

        <EditOrderModal
          isDetailsModalVisible={isDetailsModalVisible}
          setIsDetailsModalVisible={setIsDetailsModalVisible}
          address={address}
          text={{
            title: i18n.t("order_details_title"),
            section: i18n.t("select_address_text"),
            button: i18n.t("add_new_address_button"),
            close: i18n.t("close"),
          }}
        />
        <View style={{ height: Dimensions.get("window").height * 0.3 }}>
          <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
              />
            ))}
            {markers.length === 2 && (
              <MapViewDirections
                origin={markers[0].coordinate}
                destination={markers[1].coordinate}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            )}
          </MapView>
        </View>

        <View style={{ flex: 1, marginTop: 12, paddingHorizontal: 8 }}>
          <View className="flex-row ">
            <TouchableOpacity
              className={
                deliveryMode === "delivery"
                  ? "border flex-1 justify-center items-center rounded-l-md bg-pr py-1"
                  : "border flex-1 justify-center items-center rounded-l-md py-1"
              }
              onPress={() => setDeliveryMode("delivery")}
            >
              <Text
                style={{ fontFamily: Fonts.BEBAS_NEUE }}
                className="text-lg"
              >
                {i18n.t("delivery_option")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                deliveryMode !== "delivery"
                  ? "border-t border-b border-r flex-1 justify-center items-center rounded-r-md bg-pr py-1"
                  : "border-t border-b border-r flex-1 justify-center items-center rounded-r-md py-1"
              }
              onPress={() => setDeliveryMode("pick up")}
            >
              <Text
                style={{ fontFamily: Fonts.BEBAS_NEUE }}
                className="text-lg"
              >
                {i18n.t("pickup_option")}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-md p-3 mt-2">
            <View>
              <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
                {deliveryMode === "delivery"
                  ? i18n.t("delivery_text")
                  : i18n.t("pickup_text")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <MaterialCommunityIcons
                name="timer-outline"
                size={24}
                color="black"
              />
              <Text style={{ fontFamily: Fonts.LATO_REGULAR, fontSize: 14 }}>
                {deliveryMode === "delivery" ? "30 - 45 min" : "15 - 20 min"}
              </Text>
            </View>
            {deliveryMode === "delivery" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <MaterialIcons
                    name="location-history"
                    size={24}
                    color="black"
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.LATO_REGULAR,
                      fontSize: 14,
                    }}
                    numberOfLines={1}
                    className="w-3/4"
                  >
                    {address}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsDetailsModalVisible(true)}
                  >
                    <Text
                      style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 14 }}
                      className="text-pr"
                    >
                      {i18n.t("edit_button")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <LogoFocused width={24} height={24} />
                  <Text
                    style={{
                      fontFamily: Fonts.LATO_REGULAR,
                      fontSize: 14,
                    }}
                    numberOfLines={1}
                  >
                    9866 Chem. Sainte-Marguerite, Trois-Rivières
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                <LogoFocused width={24} height={24} />
                <Text
                  style={{
                    fontFamily: Fonts.LATO_REGULAR,
                    fontSize: 14,
                  }}
                  numberOfLines={1}
                >
                  9866 Chem. Sainte-Marguerite, Trois-Rivières
                </Text>
              </View>
            )}
          </View>
          <View className="bg-white rounded-md p-3 mt-3">
            <Text style={{ fontFamily: Fonts.LATO_BOLD, fontSize: 18 }}>
              {i18n.t("order_details_title")}
            </Text>
            <View className="pt-2">
              <View className="flex-row justify-between">
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry"
                >
                  {i18n.t("subtotal")}
                </Text>
                <Text
                  style={{ fontFamily: Fonts.LATO_BOLD }}
                  className="text-sm"
                >
                  {subTotal}$
                </Text>
              </View>
              {deliveryMode === "delivery" && (
                <View className="flex-row justify-between my-1 border-b pb-1 border-gray-300">
                  <Text
                    style={{ fontFamily: Fonts.LATO_REGULAR }}
                    className="text-sm text-tgry"
                  >
                    {i18n.t("delivery_fee")}
                  </Text>
                  <Text
                    style={{ fontFamily: Fonts.LATO_BOLD }}
                    className="text-sm"
                  >
                    {delivery_fee}$
                  </Text>
                </View>
              )}
              <View className="flex-row justify-between my-1 border-b pb-1 border-gray-300">
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry"
                >
                  TVQ
                </Text>
                <Text
                  style={{ fontFamily: Fonts.LATO_BOLD }}
                  className="text-sm"
                >
                  {tvq.toFixed(2)} $
                </Text>
              </View>
              <View className="flex-row justify-between my-1 border-b pb-1 border-gray-300">
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry"
                >
                  TPS
                </Text>
                <Text
                  style={{ fontFamily: Fonts.LATO_BOLD }}
                  className="text-sm"
                >
                  {tps.toFixed(2)} $
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{ fontFamily: Fonts.LATO_REGULAR }}
                  className="text-sm text-tgry"
                >
                  {i18n.t("total")}
                </Text>
                <Text
                  style={{ fontFamily: Fonts.LATO_BOLD }}
                  className="text-sm"
                >
                  {total.toFixed(2)}$
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-white rounded-md mt-3 p-3">
            <View className="flex-row items-center">
              <Text
                style={{
                  fontFamily: Fonts.LATO_BOLD,
                  fontSize: 18,
                  marginLeft: 8,
                }}
              >
                {i18n.t("payement_details")}
              </Text>
            </View>
            <View className="">
              <CardField
                postalCodeEnabled={true}
                placeholders={{
                  number: "4242 4242 4242 4242",
                }}
                ref={cardInputRef}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                }}
                style={{
                  width: "100%",
                  height: 50,
                }}
                onCardChange={(cardDetails) => {
                  setCardDetails(cardDetails);
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-pr rounded-md items-center justify-center py-2 mt-4 mx-2"
          onPress={processOrder}
        >
          <Text style={{ fontFamily: Fonts.LATO_BOLD }} className="text-lg">
            {i18n.t("process_order_button")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default CheckoutScreen;
