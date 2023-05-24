import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = (props) => {
  const [state, setState] = useState({
    menuOpen: false,
    modalOpen: false,
    toast: { text: "", success: undefined },
    theme: localStorage.getItem('data-theme') || "light",
    documentTitle: { title: "My Store ", after: "" },
    news: [],
    products: {  list: [],  loading: false },
    user: { username: "", mail: "", avatar: "", cart : [], wishlist: [], recentlyViewed: [], orders: [], role: "" },
    users: [],
    orders: [],
    messages: [],
    targetedUser: { username: "", mail: "", avatar: "", cart : [], wishlist: [], recentlyViewed: [], orders: []},
  });
  return (
    <MyContext.Provider value={{ state, setState }}>
      {props.children}
    </MyContext.Provider>
  );
};
