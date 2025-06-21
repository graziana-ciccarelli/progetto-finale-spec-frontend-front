import React, { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { Link } from "react-router-dom";

export default function SmartphoneList() {
  const {
    smartphones,
    favorites,
    toggleFavorite,
    addToCompare,
    compare,
  } = useContext(GlobalContext);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [alphaOrder, setAlphaOrder] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [messages, setMessages] = useState([]); // Array di messaggi

  const filteredSmartphones = useMemo(() => {
    const searchLower = search.toLowerCase();

    let filtered = smartphones.filter((s) => {
      const matchesTitle = s.title.toLowerCase().includes(searchLower);
      const matchesCategory = categoryFilter ? s.category === categoryFilter : true;
      return matchesTitle && matchesCategory;
    });

    filtered = filtered.slice().sort((a, b) => {
      const aStarts = a.title.toLowerCase().startsWith(searchLower);
      const bStarts = b.title.toLowerCase().startsWith(searchLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      if (alphaOrder) {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        if (aTitle < bTitle) return alphaOrder === "az" ? -1 : 1;
        if (aTitle > bTitle) return alphaOrder === "az" ? 1 : -1;
      }

      if (priceOrder) {
        const aPrice = parseFloat(a.price);
        const bPrice = parseFloat(b.price);
        if (aPrice < bPrice) return priceOrder === "asc" ? -1 : 1;
        if (aPrice > bPrice) return priceOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    return filtered;
  }, [smartphones, search, categoryFilter, alphaOrder, priceOrder]);

  const categories = Array.from(new Set(smartphones.map((s) => s.category)));

  // Funzione per aggiungere al comparatore con messaggi multipli
  const handleAddToCompare = (smartphone) => {
    const newMessages = [];

    if (compare.length >= 2) {
      newMessages.push("⚠️ Il comparatore può contenere massimo 2 smartphone.");
    }
    if (compare.find((item) => item.id === smartphone.id)) {
      newMessages.push("ℹ️ Il prodotto è già presente nel comparatore.");
    }

    if (newMessages.length === 0) {
      addToCompare(smartphone);
      newMessages.push("✅ Prodotto aggiunto al comparatore.");
    }

    setMessages(newMessages);

    // Rimuovi messaggi dopo 3 secondi
    setTimeout(() => {
      setMessages([]);
    }, 3000);
  };

  return (
    <div>
      <h1>Lista Smartphone</h1>

      {/* Messaggi di notifica */}
      {messages.length > 0 && (
        <div className="compare-message">
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="filters-container">
        <input
          placeholder="Cerca per titolo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={alphaOrder}
          onChange={(e) => {
            setAlphaOrder(e.target.value);
            setPriceOrder("");
          }}
        >
          <option value="">Ordina alfabeticamente</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>

        <select
          value={priceOrder}
          onChange={(e) => {
            setPriceOrder(e.target.value);
            setAlphaOrder("");
          }}
        >
          <option value="">Ordina per prezzo</option>
          <option value="asc">Prezzo crescente</option>
          <option value="desc">Prezzo decrescente</option>
        </select>
      </div>

      <ul>
        {filteredSmartphones.map((s) => (
          <li key={s.id}>
            {s.image && (
              <img
                src={s.image}
                alt={s.title}
                className="smartphone-list-image"
              />
            )}
            <Link to={`/smartphones/${s.id}`}>{s.title}</Link> - {s.category}
            <p className="smartphone-list-price">
              Prezzo:{" "}
              <strong>
                {s.price.toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </strong>
            </p>
            <button
              onClick={() => toggleFavorite(s)}
              className={favorites.find((f) => f.id === s.id) ? "remove-favorite" : ""}
            >
              {favorites.find((f) => f.id === s.id)
                ? "Rimuovi Preferito"
                : "Aggiungi ai Preferiti"}
            </button>
            <button onClick={() => handleAddToCompare(s)}>
              Aggiungi al Comparatore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
