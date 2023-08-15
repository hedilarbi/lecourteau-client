import axios from "axios";
import { ApiUrl } from "../constants";

const createUser = async (phone_number) => {
  try {
    let createUserResponse = await axios.post(`${ApiUrl}/users/create`, {
      phone_number,
    });
    if (createUserResponse?.status === 200) {
      return {
        status: true,
        message: "user data",
        data: createUserResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "no user data",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const addToFavorites = async (userId, itemId) => {
  try {
    let addToFavoritesResponse = await axios.put(
      `${ApiUrl}/users/favorites/update/add/${userId}`,
      { menuItem_id: itemId }
    );
    if (addToFavoritesResponse?.status === 200) {
      return {
        status: true,
        message: "favorites added",
        data: addToFavoritesResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "didn't add",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const removeFromFavorites = async (userId, itemId) => {
  try {
    let removeFromFavoritesResponse = await axios.put(
      `${ApiUrl}/users/favorites/update/remove/${userId}`,
      { menuItem_id: itemId }
    );
    if (removeFromFavoritesResponse?.status === 200) {
      return {
        status: true,
        message: "favorites added",
        data: removeFromFavoritesResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "didn't add",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const getUserByToken = async (token) => {
  try {
    let getUserByToken = await axios.get(`${ApiUrl}/users/userByToken/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (getUserByToken.status === 200) {
      return {
        status: true,
        message: "user data",
        data: getUserByToken.data,
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

export { createUser, removeFromFavorites, addToFavorites, getUserByToken };
