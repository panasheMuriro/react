import { useEffect, useState } from "react";
import Category from "../components/Category";
import TimerLetter from "../components/TimerLetter";
import { useDbUpdate } from "../utils/firebase";
import useNameStore from "../store/nameStore";
import { useNavigate } from "react-router-dom";

export default function PlayPage() {
  const { myName } = useNameStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [country, setCountry] = useState("");
  const [animal, setAnimal] = useState("");

  const [setPlayerAnswers] = useDbUpdate(
    `/knowledge_game/${myName}/answers`
  );

  const [setPlayerScores] = useDbUpdate(
    `/knowledge_game/${myName}/scores`
  );


  const [timerDone, setTimerDone] = useState(false);

  const handleTimerDone  = () => {
    setTimerDone(true);
  }


  useEffect(()=>{
    if (timerDone){
    
    setPlayerAnswers({
      name,
      food,
      animal,
      country,
    });

    setPlayerScores({
      name: 0,
      food:0,
      animal:0,
      country:0
    })

    navigate("/grading");
  }
  }, [timerDone])

  return (
    <>
      <div style={{ margin: "50px 0px" }}>Hi, {myName} 👋🏽 </div>
      <TimerLetter onTimerDone={handleTimerDone} />
      <Category
        title="Name"
        inputChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Category
        title="Food"
        inputChange={(e) => {
          setFood(e.target.value);
        }}
      />
      <Category
        title="Country"
        inputChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <Category
        title="Animal"
        inputChange={(e) => {
          setAnimal(e.target.value);
        }}
      />
      {/* <button onClick={handleSubmitAnswers} style={{ marginTop: 20 }}>
        Submit answers
      </button> */}
    </>
  );
}
