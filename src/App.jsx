import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SmartphoneList from "./components/SmartphoneList.jsx";
import SmartphoneDetail from "./components/SmartphoneDetail.jsx";
import Favorites from "./components/Favorites.jsx";
import Comparator from "./components/Comparator.jsx";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>  <Link to="/favorites">Preferiti</Link> 
        <Link to="/compare">Comparatore</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SmartphoneList />} />
        <Route path="/smartphones/:id" element={<SmartphoneDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/compare" element={<Comparator />} />
      </Routes>
    </>
  );
}
