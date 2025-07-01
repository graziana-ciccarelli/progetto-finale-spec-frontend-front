import React, { createContext, useEffect, useState } from "react";
import smartphonesData from "../data/smartphones.json"; 

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [smartphones, setSmartphones] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [compare, setCompare] = useState([]);

  useEffect(() => {
    setSmartphones(smartphonesData);
  }, []);

  const toggleFavorite = (smartphone) => {
    setFavorites((prev) =>
      prev.find((s) => s.id === smartphone.id)
        ? prev.filter((s) => s.id !== smartphone.id)
        : [...prev, smartphone]
    );
  };

  
  const addToCompare = (smartphone) => {
    setCompare((prev) => {
      if (prev.find((s) => s.id === smartphone.id)) return prev; 
      if (prev.length >= 2) return prev;
      return [...prev, smartphone];
    });
  };

  const removeFromCompare = (id) => {
    setCompare((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        smartphones,
        favorites,
        toggleFavorite,
        compare,
        addToCompare,
        removeFromCompare,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
