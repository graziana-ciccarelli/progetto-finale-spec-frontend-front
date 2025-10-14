import React, { createContext, useEffect, useState } from "react";
import smartphonesData from "../data/smartphones.json"; 

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [smartphones, setSmartphones] = useState([]);
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [compare, setCompare] = useState([]);

  useEffect(() => {
    setSmartphones(smartphonesData);
  }, []); 

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); 

  const toggleFavorite = (smartphone) => {
    setFavorites((currentFavorites) => {
      // Controlla se lo smartphone è già presente
      const isAlreadyFavorite = currentFavorites.some(s => s.id === smartphone.id);

      if (isAlreadyFavorite) {
        // Se presente, rimuovilo
        return currentFavorites.filter(s => s.id !== smartphone.id);
      } else {
        // Se non presente, aggiungilo
        return [...currentFavorites, smartphone];
      }
    });
  };

  const addToCompare = (smartphone) => {
    setCompare((currentCompare) => {
      // Non aggiungere se è già presente
      if (currentCompare.some(s => s.id === smartphone.id)) return currentCompare; 
      // Non aggiungere se ci sono già 2 elementi
      if (currentCompare.length >= 2) return currentCompare; 
      // Aggiungi lo smartphone
      return [...currentCompare, smartphone];
    });
  };

  const removeFromCompare = (id) => {
    setCompare((currentCompare) => 
      // Filtra e rimuovi l'elemento con l'ID specificato
      currentCompare.filter(s => s.id !== id)
    );
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