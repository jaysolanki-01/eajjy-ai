import React from "react";

const CLIENTS = [
  { name: "Sander Dickkopp Eventlocation", src: "/clients/sander-dickkopp.png" },
  { name: "Raj Tandoor", src: "/clients/raj-tandoor.png" },
  { name: "Kareliya Equipments", src: "/clients/kareliya.png" },
  { name: "Fair Print Solutions", src: "/clients/fair-print.png" },
  { name: "Capital Flux", src: "/clients/capital-flux.png" },
  { name: "Kaleen Baba", src: "/clients/kaleen-baba.png" },
  { name: "Luniva", src: "/clients/luniva.png" },
  { name: "Urban Money", src: "/clients/urban-money.png" },
];

export default function ClientLogos() {
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="logos reveal">
      <div className="wrap">
        <p>Powering automation for modern ecommerce brands</p>
      </div>
      <div className="logo-marquee" aria-label="Client logos">
        <div className="logo-track">
          {track.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              className="client-logo"
              src={client.src}
              alt={client.name}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
