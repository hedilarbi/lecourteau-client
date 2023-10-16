import { useEffect, useState } from "react";
import { getCategoriesNames, getMenuItems } from "../services/FoodServices";
import { useRoute } from "@react-navigation/native";

const useMenuData = (setIsLoading, refresh) => {
  const route = useRoute();
  const [errors, setErrors] = useState(false);
  const [menuCategories, setMenuCategories] = useState([]);
  const [filteredMenuItemsList, setFilteredMenuItemsList] = useState([]);
  const [menuItemsList, setMenuItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const fetchData = async () => {
    setErrors(false);
    setIsLoading(true);
    try {
      const [categoriesNamesResponse, menuItemsResponse] = await Promise.all([
        getCategoriesNames(),
        getMenuItems(),
      ]);

      if (categoriesNamesResponse.status) {
        setMenuCategories([
          { _id: "0", name: "All" },
          { _id: "1", name: "Favorites" },
          ...categoriesNamesResponse.data,
        ]);
      } else {
        setErrors(true);
        return null;
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
          setSelectedItem(index + 2);
          // flatListRef.current.scrollToIndex({ index: index + 1 });
        } else {
          setFilteredMenuItemsList(menuItemsResponse.data);
        }
      } else {
        setErrors(true);
      }
    } catch (error) {
      setErrors(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh, route.params]);

  return {
    menuCategories,
    filteredMenuItemsList,
    menuItemsList,
    setFilteredMenuItemsList,
    setSelectedItem,
    selectedItem,
    errors,
  };
};

export default useMenuData;
