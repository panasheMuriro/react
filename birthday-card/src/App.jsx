import { useState } from "react";
import "./App.css";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect } from "react";
import Card from "./Card";


function App() {
  const [isExploding, setIsExploding] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    let c = 3;
    let interval = setInterval(() => {
      if (c == 0) {
        clearInterval(interval);
        setIsExploding(true);
        setCount(0);
      }
      c -= 1;
      setCount(c);
    }, 1000);
  }, []);

  const params = new URLSearchParams(window.location.search);
  const name= params.get('name');

  return (
    <div className="main">
      {count > 0 ? (
        <h1 className="counter">{count > 0 ? count : ""}</h1>
      ) : (
        <Card name={name} />
      )}
    </div>
  );
}

export default App;
