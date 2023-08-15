import axios from "axios";
import { ApiUrl } from "../constants";

const createOrder = async (order) => {
  try {
    let createOrderResponse = await axios.post(`${ApiUrl}/orders/create/`, {
      order,
    });
    if (createOrderResponse.status === 201) {
      return {
        status: true,
        message: "order data",
        data: createOrderResponse.data,
      };
    } else {
      return {
        status: false,
        message: "didn't found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export { createOrder };
