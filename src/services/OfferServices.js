import { API_URL } from "@env";
import axios from "axios";

const getOffer = async (id) => {
  try {
    let getOfferResponse = await axios.get(`${API_URL}/offers/${id}`, {
      timeout: 10000,
    });
    if (getOfferResponse.status === 200) {
      return {
        status: true,
        message: "order data",
        data: getOfferResponse.data,
      };
    } else {
      return {
        status: false,
        message: "didn't found",
        data: "offer data no ",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export { getOffer };
