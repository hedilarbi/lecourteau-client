import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../redux/slices/orderSlide";
import { createOrder } from "../services/OrderServices";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { clearBasket } from "../redux/slices/basketSlice";
import { setUser } from "../redux/slices/userSlice";

const ProcessScreen = () => {
  const order = useSelector(selectOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const processOrder = async () => {
    createOrder(order).then((response) => {
      console.log(response.data);
      if (response?.status) {
        dispatch(clearBasket());
        dispatch(setUser(response.data));
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        Alert.alert("Something Went Wrong");
      }
    });
  };
  useEffect(() => {
    processOrder();
  }, []);
  return (
    <View>
      <Text>Loading ... </Text>
    </View>
  );
};

export default ProcessScreen;
