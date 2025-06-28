import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, toggleFavorite, addToCompare, compare } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);

 
  const formatPrice = (price) =>
    price.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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

    setTimeout(() => {
      setMessages([]);
    }, 3000);
  };

  return (
    <div>
      <h2>Preferiti</h2>

      {messages.length > 0 && (
        <div className="compare-message">
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {favorites.length === 0 ? (
        <p>Nessuno smartphone nei preferiti.</p>
      ) : (
        <ul>
          {favorites.map((smartphone) => (
            <li key={smartphone.id}>
              {smartphone.image && (
                <img
                  src={smartphone.image}
                  alt={smartphone.title}
                  className="smartphone-list-image"
                />
              )}
              <Link to={`/smartphones/${smartphone.id}`}>
                {smartphone.title}
              </Link>{" "}
              - {smartphone.category}
              <p className="smartphone-list-price">
                Prezzo: <strong>{formatPrice(smartphone.price)}</strong>
              </p>
              <button
                onClick={() => toggleFavorite(smartphone)}
                className="remove-favorite"
              >
                Rimuovi dai Preferiti
              </button>
              <button onClick={() => handleAddToCompare(smartphone)}>
                Aggiungi al Comparatore
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link to="/">Torna alla lista</Link>
      </p>
    </div>
  );
}
