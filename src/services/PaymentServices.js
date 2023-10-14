import axios from "axios";
import { API_URL } from "@env";

const getPaymentIntentClientSecret = async (amount) => {
  try {
    let getPaymentIntentClientSecretResponse = await axios.post(
      `${API_URL}/payments/create-payment-intent`,
      { amount },
      {
        timeout: 10000,
      }
    );
    if (getPaymentIntentClientSecretResponse.status === 200) {
      return {
        status: true,
        message: "user data",
        data: getPaymentIntentClientSecretResponse.data,
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

export { getPaymentIntentClientSecret };
