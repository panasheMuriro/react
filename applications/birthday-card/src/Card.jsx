import React from 'react';
import "./Card.css"
import ConfettiExplosion from "react-confetti-explosion";


export default function Card({name}) {
  return (
    <>
    <div className="main-card">
        🎉
        <h2>🎂 Happy Birthday 🎂</h2>
        <br></br>
        <ConfettiExplosion particleCount={200} duration={3000} />
        <b>{name}</b>
    </div>
    </>
  );
}
