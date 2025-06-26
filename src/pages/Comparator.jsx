import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Comparator() {
  const { compare, removeFromCompare } = useContext(GlobalContext);

  if (!compare || compare.length === 0) {
    return <p>Seleziona fino a 2 smartphone per confrontarli.</p>;
  }

  return (
    <div className="comparator-container">
      {compare.map((phone) => (
        <div key={phone.id} className="smartphone-card">
          {phone.image && (
            <img
              src={phone.image}
              alt={phone.title}
              className="smartphone-card-image"
            />
          )}
          <h3>{phone.title}</h3>

          <div className="comparison-characteristics">
            <p><strong>Categoria:</strong> <span>{phone.category}</span></p>
            <p><strong>Marca:</strong> <span>{phone.brand}</span></p>
            <p><strong>Prezzo:</strong> <span>{phone.price.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</span></p>
            <p><strong>Anno:</strong> <span>{phone.releaseYear}</span></p>
            <p><strong>Display:</strong> <span>{phone.screenSize}"</span></p>
            <p><strong>RAM:</strong> <span>{phone.ramGB} GB</span></p>
            <p><strong>Archiviazione:</strong> <span>{phone.storageGB} GB</span></p>
            <p><strong>Fotocamera principale:</strong> <span>{phone.mainCameraMP} MP</span></p>
            <p><strong>Fotocamera selfie:</strong> <span>{phone.selfieCameraMP} MP</span></p>
            <p><strong>Batteria:</strong> <span>{phone.batteryCapacity} mAh</span></p>
          </div>

          <button onClick={() => removeFromCompare(phone.id)}>
            Rimuovi dal confronto
          </button>
        </div>
      ))}
    </div>
  );
}
