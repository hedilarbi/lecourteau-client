import axios from "axios";
import { API_URL } from "@env";

const getCategories = async () => {
  try {
    let categoriesResponse = await axios.get(`${API_URL}/categories/`, {
      timeout: 10000,
    });
    if (categoriesResponse?.status === 200) {
      return {
        status: true,
        message: "categories data fetched",
        data: categoriesResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "categories data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const getCategoriesNames = async () => {
  try {
    let categoriesResponse = await axios.get(`${API_URL}/categories/names`, {
      timeout: 10000,
    });
    if (categoriesResponse?.status === 200) {
      return {
        status: true,
        message: "categories data fetched",
        data: categoriesResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "categories data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const getOffers = async () => {
  try {
    let offersResponse = await axios.get(`${API_URL}/offers/`, {
      timeout: 10000,
    });
    if (offersResponse?.status === 200) {
      return {
        status: true,
        message: "offers data fetched",
        data: offersResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "offers data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const getMenuItems = async () => {
  try {
    let menuItemsResponse = await axios.get(`${API_URL}/menuItems/`, {
      timeout: 10000,
    });
    if (menuItemsResponse?.status === 200) {
      return {
        status: true,
        message: "offers data fetched",
        data: menuItemsResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "menu items data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const getMenuItem = async (id) => {
  try {
    let menuItemResponse = await axios.get(`${API_URL}/menuItems/${id}`, {
      timeout: 10000,
    });
    if (menuItemResponse?.status === 200) {
      return {
        status: true,
        message: "offers data fetched",
        data: menuItemResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "menu item data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const getRewards = async () => {
  try {
    let rewardsResponse = await axios.get(`${API_URL}/rewards/`, {
      timeout: 10000,
    });
    if (rewardsResponse?.status === 200) {
      return {
        status: true,
        message: "offers data fetched",
        data: rewardsResponse?.data,
      };
    } else {
      return {
        status: false,
        message: "menu item data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export {
  getCategories,
  getOffers,
  getMenuItems,
  getCategoriesNames,
  getMenuItem,
  getRewards,
};
