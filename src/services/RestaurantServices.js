import { API_URL } from "@env";
import axios from "axios";

const getRestaurantSettings = async () => {
  try {
    let getRestaurantSettingsResponse = await axios.get(`${API_URL}/settings`, {
      timeout: 10000,
    });
    if (getRestaurantSettingsResponse.status === 200) {
      return {
        status: true,
        message: "order data",
        data: getRestaurantSettingsResponse.data[0],
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

export { getRestaurantSettings };
