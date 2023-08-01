const MENU_ITEMS = [
  {
    id: "1",
    name: "Ailes de poulet",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
    description: "(4 morceaux)",
    category: "ENTRÉES",
    prices: [
      {
        size: "Medium",
        price: 6.8,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Bâtonnets de fromage",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/07/Ba%CC%82tonnets-fromage-scaled-aspect-ratio-264-257-scaled.jpg",
    description: "",
    category: "ENTRÉES",
    prices: [
      {
        size: "Medium",
        price: 6.8,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Frites",
    description: "",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/07/Frite-scaled-aspect-ratio-264-257-scaled.jpg",
    category: "FRITES",
    prices: [
      {
        size: "Small",
        price: 4.25,
      },
      {
        size: "Medium",
        price: 5.75,
      },
      {
        size: "Large",
        price: 12.35,
      },
      {
        size: "Extra Larg",
        price: 14.15,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Poutine régulière",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/07/Poutine-re%CC%81gulie%CC%80re-scaled-aspect-ratio-264-257-scaled.jpg",
    description: "",
    category: "POUTINES",
    prices: [
      {
        size: "Small",
        price: 9.05,
      },
      {
        size: "Medium",
        price: 12,
      },
      {
        size: "Large",
        price: 16.5,
      },
      {
        size: "Extra Larg",
        price: 19.7,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Poutine Italienne",
    description: "",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/07/0adb2ac5-5a04-4df0-bc4f-3334ecba3152-aspect-ratio-264-257.jpeg",
    category: "POUTINES",
    prices: [
      {
        size: "Small",
        price: 9.05,
      },
      {
        size: "Medium",
        price: 12,
      },
      {
        size: "Large",
        price: 16.5,
      },
      {
        size: "Extra Larg",
        price: 19.7,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Poutine la doc",
    description: "",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/07/0adb2ac5-5a04-4df0-bc4f-3334ecba3152-aspect-ratio-264-257.jpeg",
    category: "POUTINES SIGNATURES",
    prices: [
      {
        size: "Small",
        price: 9.05,
      },
      {
        size: "Medium",
        price: 12,
      },
      {
        size: "Large",
        price: 16.5,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Poutine porc effiloché",
    image:
      "https://lecourteau.com/wp-content/uploads/2022/01/Poutine-porc-effiloche%CC%81-3-scaled-e1643664434123-aspect-ratio-264-257-scaled.jpg",
    description: "",
    category: "POUTINES SIGNATURES",
    prices: [
      {
        size: "Small",
        price: 9.05,
      },
      {
        size: "Medium",
        price: 12,
      },
      {
        size: "Large",
        price: 16.5,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    name: "Assiette filets de poulet croustillants",
    description: "",
    category: "ASSIETTES",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/11/Filets-scaled-aspect-ratio-264-257-scaled.jpg",
    prices: [
      {
        size: "Medium",
        price: 6.8,
        note: "(4 morceaux)",
      },
      {
        size: "Large",
        price: 6.8,
        note: "(6 morceaux)",
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "Assiette poulet frit",
    description: "",
    category: "ASSIETTES",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/11/PouletFrit3-scaled-aspect-ratio-264-257-scaled.jpg",
    prices: [
      {
        size: "Small",
        price: 6.8,
        note: "(2 morceaux)",
      },
      {
        size: "Medium",
        price: 6.8,
        note: "(4 morceaux)",
      },
      {
        size: "Large",
        price: 6.8,
        note: "(6 morceaux)",
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Focaccia",
    description: "",
    category: "PIZZAS",
    image:
      "https://lecourteau.com/wp-content/uploads/2021/11/Focaccia1-1-scaled-aspect-ratio-264-257-scaled.jpg",
    prices: [
      {
        size: "Medium",
        price: 6.8,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "11",
    name: "Pizza pepperoni",
    description: "",
    category: "PIZZAS",
    image:
      "https://lecourteau.com/wp-content/uploads/2023/06/PizzaPepp01-scaled-aspect-ratio-264-257-scaled.jpeg",
    prices: [
      {
        size: "Medium",
        price: 6.8,
      },
      {
        size: "Large",
        price: 6.8,
      },
      {
        size: "Extra Larg",
        price: 6.8,
      },
    ],
    customization: [
      {
        id: "1",
        category: "Sauce",
        items: [
          {
            id: "1",
            name: "Réguliere",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "2",
            name: "BBQ",
            state: false,
            price: 0,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
          {
            id: "3",
            name: "Poivre",
            state: false,
            price: 0.5,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "2",
        category: "Extra",
        items: [
          {
            id: "1",
            name: "Cheese",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
      {
        id: "3",
        category: "Options",
        items: [
          {
            id: "1",
            name: "Sauce a part",
            state: false,
            price: 1,
            image:
              "https://lecourteau.com/wp-content/uploads/2021/11/WingsAlone-scaled-aspect-ratio-264-257-scaled.jpg",
          },
        ],
      },
    ],
  },
];

export default MENU_ITEMS;
