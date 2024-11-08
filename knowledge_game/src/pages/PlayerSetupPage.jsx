import { useNavigate } from "react-router-dom";
import useNameStore from "../store/nameStore";

export default function PlayerSetupPage() {

  // player will control this characters

  const { setMyName} =  useNameStore();
  const navigate = useNavigate();

  const handleSetName = (name) => {
    setMyName(name);
    navigate("/play"); // go to play
  }


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 50, placeItems: "center", marginTop: 100 }}>
        <h2>Knowledge Games Logo</h2>
        <div>Join as</div>
        <button  onClick={()=>handleSetName("Panashe")}>Panashe</button>
        <button onClick={()=>handleSetName("Karen")}>Karen</button>
        <div style={{fontSize:10}}>❤️ Kash Games ❤️</div>
      </div>
    </>
  );
}
