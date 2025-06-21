import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext.jsx";

export default function SmartphoneDetail() {
  const { id } = useParams();
  const { smartphones, toggleFavorite, addToCompare, compare, favorites } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);

  const phone = smartphones.find((s) => s.id.toString() === id);

  if (!phone) {
    return (
      <div className="not-found">
        <p>Smartphone non trovato.</p>
        <Link to="/" className="back-link">← Torna alla lista</Link>
      </div>
    );
  }

  const isFavorite = favorites.some((f) => f.id === phone.id);

  const handleAddToCompare = (smartphone) => {
    const newMessages = [];

    const alreadyInCompare = compare.find((item) => item.id === smartphone.id);
    if (alreadyInCompare) {
      newMessages.push("ℹ️ Il prodotto è già presente nel comparatore.");
    }

    if (compare.length >= 2 && !alreadyInCompare) {
      newMessages.push("⚠️ Il comparatore può contenere massimo 2 smartphone.");
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
    <div className="smartphone-detail">
      <h1 className="smartphone-title">{phone.title}</h1>

      {/* Messaggi con emoji */}
      {messages.length > 0 && (
        <div className="compare-message">
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {phone.image && (
        <img
          src={phone.image}
          alt={phone.title}
          className="smartphone-image"
        />
      )}

      <p><strong>Categoria:</strong> <span>{phone.category}</span></p>
      <p><strong>Marca:</strong> <span>{phone.brand}</span></p>
      <p>
        <strong>Prezzo:</strong>{" "}
        <span>
          {phone.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </p>
      <p><strong>Anno:</strong> <span>{phone.releaseYear}</span></p>
      <p><strong>Display:</strong> <span>{phone.screenSize}"</span></p>
      <p><strong>RAM:</strong> <span>{phone.ramGB} GB</span></p>
      <p><strong>Archiviazione:</strong> <span>{phone.storageGB} GB</span></p>
      <p><strong>Fotocamera principale:</strong> <span>{phone.mainCameraMP} MP</span></p>
      <p><strong>Fotocamera selfie:</strong> <span>{phone.selfieCameraMP} MP</span></p>
      <p><strong>Batteria:</strong> <span>{phone.batteryCapacity} mAh</span></p>

      <div className="buttons">
        <button
          onClick={() => toggleFavorite(phone)}
          className={`favorite-btn ${isFavorite ? "remove" : ""}`}
        >
          {isFavorite ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
        </button>

        <button onClick={() => handleAddToCompare(phone)} className="compare-btn">
          Aggiungi al Comparatore
        </button>
      </div>

      <div className="back-container">
        <Link to="/" className="back-link">← Torna alla lista</Link>
      </div>
    </div>
  );
}
