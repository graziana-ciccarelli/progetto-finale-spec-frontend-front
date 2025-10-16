import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { Link } from "react-router-dom";

export default function SmartphoneList() {
  // Recupero dei dati globali e delle funzioni tramite Context
  const {
    smartphones,
    favorites,
    toggleFavorite,
    addToCompare,
    compare,
  } = useContext(GlobalContext);

  // Stati per gestire i filtri e gli ordinamenti
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [alphaOrder, setAlphaOrder] = useState(""); // 'az' o 'za'
  const [priceOrder, setPriceOrder] = useState(""); // 'asc' o 'desc'
  const [messages, setMessages] = useState([]); // Per notifiche

  // Filtra gli smartphone
  let filteredSmartphones = smartphones.filter((s) => {
    const searchLower = search.toLowerCase();
    const titleLower = s.title.toLowerCase();

    // Filtro per titolo
    const matchesTitle = titleLower.includes(searchLower);

    // Filtro per categoria (se categoryFilter è vuoto, tutti matchano)
    const matchesCategory = categoryFilter === "" || s.category === categoryFilter;

    return matchesTitle && matchesCategory;
  });

  // copia smartphone e ordina
  filteredSmartphones = filteredSmartphones.slice().sort((a, b) => {

    // VARIABILI UTILI PER LA PRIORITÀ
    const searchLower = search.toLowerCase(); 
    const aTitleLower = a.title.toLowerCase();
    const bTitleLower = b.title.toLowerCase();
    
    //  Elementi che iniziano con il termine di ricerca 
    const aStarts = aTitleLower.startsWith(searchLower);
    const bStarts = bTitleLower.startsWith(searchLower);

    // Diamo la priorità solo se c'è un termine di ricerca
    if (searchLower) {
        // Se A inizia con la ricerca e B no, A viene prima (-1)
        if (aStarts && !bStarts) return -1;
        // Se B inizia con la ricerca e A no, B viene prima (1)
        if (!aStarts && bStarts) return 1;
    }

    // Ordinamento alfabetico
    if (alphaOrder === "az") {
      return a.title.localeCompare(b.title); // A-Z 
    } else if (alphaOrder === "za") {
      return b.title.localeCompare(a.title); // Z-A 
    }

    //  Ordinamento per prezzo 
    if (priceOrder === "asc") {
      // Prezzo Crescente (dal più basso al più alto)
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (priceOrder === "desc") {
      // Prezzo Decrescente (dal più alto al più basso)
      return parseFloat(b.price) - parseFloat(a.price);
    }

    // Se nessun ordinamento è selezionato
    return 0;
  });


  //  Calcola le categorie disponibili
  const categories = Array.from(new Set(smartphones.map((s) => s.category)));


  // Gestione dell'aggiunta al comparatore con messaggi di notifica
  const handleAddToCompare = (smartphone) => {
    const newMessages = [];

    // Controlla se ci sono già 2 prodotti
    if (compare.length >= 2) {
      newMessages.push("⚠️Il comparatore può contenere massimo 2 smartphone.");
    } 
    // Controlla se il prodotto è già dentro
    if (compare.find((item) => item.id === smartphone.id)) {
      newMessages.push("ℹ️Il prodotto è già presente nel comparatore.");
    }

    // Se non ci sono errori, aggiungi
    if (newMessages.length === 0) {
      addToCompare(smartphone);
      newMessages.push("✅Prodotto aggiunto al comparatore.");
    }

    setMessages(newMessages);

    // Rimuove i messaggi dopo 3 secondi
    setTimeout(() => {
      setMessages([]);
    }, 3000);
  };

  
  return (
    <div>
      <h1>Lista Smartphone</h1>

      {/* Messaggi di notifica  */}
      {messages.length > 0 && (
        <div className="compare-message">
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Controlli per i filtri e gli ordinamenti */}
      <div className="filters-container">
        <input
          placeholder="Cerca per titolo..."
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
            setPriceOrder(""); // Resetta l'altro ordinamento
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
            setAlphaOrder(""); // Resetta l'altro ordinamento
          }}
        >
          <option value="">Ordina per prezzo</option>
          <option value="asc">Prezzo crescente</option>
          <option value="desc">Prezzo decrescente</option>
        </select>
      </div>
      <hr/>

      {/* Lista smartphone */}
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
            {/* Link per andare al dettaglio del prodotto */}
            <Link to={`/smartphones/${s.id}`}>{s.title}</Link> - {s.category}
            <p className="smartphone-list-price">
              Prezzo:{" "}
              <strong>
                {parseFloat(s.price).toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </strong>
            </p>
            
            {/* bottone per aggiungere/rimuovere dai preferiti */}
            <button
              onClick={() => toggleFavorite(s)}
              className={favorites.find((f) => f.id === s.id) ? "remove-favorite" : ""}
            >
              {favorites.find((f) => f.id === s.id)
                ? "Rimuovi Preferito"
                : "Aggiungi ai Preferiti"}
            </button>

            {/* bottone per aggiungere al comparatore */}
            <button onClick={() => handleAddToCompare(s)}>
              Aggiungi al Comparatore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}