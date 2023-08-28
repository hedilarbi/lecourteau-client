import axios from "axios";
import { API_URL } from "@env";

const createOrder = async (order) => {
  try {
    let createOrderResponse = await axios.post(
      `${API_URL}/orders/create/`,
      {
        order,
      },
      {
        timeout: 10000,
      }
    );
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

const getOrder = async (id) => {
  try {
    let getOrderResponse = await axios.get(`${API_URL}/orders/${id}`, {
      timeout: 10000,
    });
    if (getOrderResponse.status === 200) {
      return {
        status: true,
        message: "order data",
        data: getOrderResponse.data,
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

export { createOrder, getOrder };
