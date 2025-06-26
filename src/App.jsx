import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SmartphoneList from "./pages/SmartphoneList.jsx";
import SmartphoneDetail from "./pages/SmartphoneDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Comparator from "./pages/Comparator.jsx";

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
