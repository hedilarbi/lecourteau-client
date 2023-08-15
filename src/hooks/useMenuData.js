import { useEffect, useState } from "react";
import { getCategoriesNames, getMenuItems } from "../services/FoodServices";
import { useRoute } from "@react-navigation/native";

const useMenuData = () => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [menuCategories, setMenuCategories] = useState([
    { _id: "0", name: "All" },
  ]);
  const [filteredMenuItemsList, setFilteredMenuItemsList] = useState([]);
  const [menuItemsList, setMenuItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const fetchData = async () => {
    try {
      const [categoriesNamesResponse, menuItemsResponse] = await Promise.all([
        getCategoriesNames(),
        getMenuItems(),
      ]);

      if (categoriesNamesResponse.status) {
        setMenuCategories((prevCategories) => [
          ...prevCategories,
          ...categoriesNamesResponse.data,
        ]);
      } else {
        console.error(
          "Categories data not found:",
          categoriesNamesResponse.message
        );
      }

      if (menuItemsResponse.status) {
        setMenuItemsList(menuItemsResponse.data);

        if (route.params) {
          const newMenuItemList = menuItemsResponse.data.filter(
            (menuItem) => menuItem.category.name === route.params.category
          );
          const index = categoriesNamesResponse.data.findIndex(
            (item) => item.name === route.params.category
          );

          setFilteredMenuItemsList(newMenuItemList);
          setSelectedItem(index + 1);
          // flatListRef.current.scrollToIndex({ index: index + 1 });
        } else {
          setFilteredMenuItemsList(menuItemsResponse.data);
        }
      } else {
        console.error("Offers data not found:", offersResponse.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    menuCategories,
    filteredMenuItemsList,
    menuItemsList,
    setFilteredMenuItemsList,
    setSelectedItem,
    selectedItem,
  };
};

export default useMenuData;
