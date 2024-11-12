import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDbData, useDbUpdate } from "../utils/firebase";
import useNameStore from "../store/nameStore";

export default function TimerLetter({ onTimerDone }) {
  const [startTimer] = useDbUpdate(`/knowledge_game/controls`);
  const [setSelectedLetter] = useDbUpdate(`/knowledge_game/controls`);
  const [selectedLetter] = useDbData(`/knowledge_game/controls/selected_letter`);
  const [timerStarted] = useDbData(`/knowledge_game/controls/timer_started`);
  const [timer, setTimer] = useState(60);
  const [letter, setLetter] = useState("A");
  const [letterTimerRunning, setLetterTimerRunning] = useState(false);

  const {myName} = useNameStore();


  const handleTimerStart = () => {
    startTimer({ timer_started: true });
  };

  useEffect(() => {

    console.log("----- ", timerStarted, onTimerDone)

    if (timerStarted) {
      pickALetter().then(() => {
        let t = 30;
        let interval = setInterval(() => {
          t -= 1;
          setTimer(t);
          if (t === 0) {
            startTimer({ timer_started: false });
            clearInterval(interval);
            onTimerDone(); // Notify parent that the timer is done
          }
        }, 1000);
      });
    }
  }, [timerStarted]);





  const pickALetter = () => {
    return new Promise((resolve) => {
      const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
      let index = 0;
      let count = 0;

      setLetterTimerRunning(true);

      const interval = setInterval(() => {
        index = (index + 1) % alphabet.length; // loop back to 'A' if index exceeds alphabet length
        count += 1;

        setLetter(alphabet[index]);

        if (count === 20) {
          const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
          setSelectedLetter({ selected_letter: randomChar });
          setLetter(randomChar);
          setLetterTimerRunning(false);

          clearInterval(interval);
          resolve(randomChar); // resolve with the final selected letter
        }
      }, 100);
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        placeItems: "center",
      }}
    >
      <h2>{timer}</h2>
      <h1>{letterTimerRunning ? letter : selectedLetter}</h1>
      
      {myName == "Panashe" && timerStarted ? (
        <div></div>
      ) : (
        <button onClick={handleTimerStart}>Start</button>
      )}


    </div>
  );
}

TimerLetter.propTypes = {
  onTimerDone: PropTypes.func.isRequired, // This function will be called when the timer reaches zero
};
