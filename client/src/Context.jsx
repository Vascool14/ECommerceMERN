import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = (props) => {
  const [state, setState] = useState({
    menuOpen: false,
    modalOpen: false,
    toast: {
      text: "",
      success: undefined,
    },
    theme: localStorage.getItem('data-theme') || "light",
    documentTitle: {
      title: "Amazon Store ",
      after: "",
    },
    // searchOpen: false,
    news: {
      show: true,
      list: ["free UK delivery with orders over £50", "new! mineral SPF50 lotion just dropped", "20% off all skincare sets"],
    },
    products: {
      list: [],
      loading: false
    },
    user: {
      username: "",
      mail: "",
      avatar: "",
      cart : [],
      wishlist: [],
      recentlyViewed: [],
      orders: []
    }
  });
  return (
    <MyContext.Provider value={{ state, setState }}>
      {props.children}
    </MyContext.Provider>
  );
};
