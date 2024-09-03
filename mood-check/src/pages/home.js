import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react'
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon';
import { db, useAuth } from '../utils/firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";


export default function Home() {
  let user = useAuth();

  const [selectedEmoji, setSelectedEmoji] = useState();
  const [reason, setReason] = useState('');


  let emojis = [
    '😐',
    '🙁',
    '😃',
    '🙂',
    '😔'
  ];




  // TODO: handle posting to firebase

  const addMood = () => {

    const userRef = doc(db, "users", user.uid);
    // Set the "capital" field of the city 'DC'
    updateDoc(userRef, {
      data: arrayUnion({
        time: new Date().toISOString(),
        emoji: selectedEmoji,
        reason: reason
      })
    }).then(done=> {
      console.log("It worked")
    })
    setSelectedEmoji();
    setReason('');
    navigate('/timeline')
  }

  return (
    <div style={{height: "100vh" }}>
      <div style={{position: "sticky", top: 0, height: "10vh", display: "flex",marginBottom: -3 }}>
        <div style={{ backgroundColor: "#F8CBA6", color: "#808080", fontSize: 24, width: "100%", alignItems: "center", display: "flex", justifyContent: "space-evenly" }}>
          <button style={{ visibility: "hidden", borderColor: "#F8CBA6", borderStyle: "solid", borderWidth: 2, height: 50, width: 50, backgroundColor: "#FEFBE9", borderRadius: 10 }}><ListUnorderedIcon /></button>
          <h1 style={{ margin: 0, color: "#fff", WebkitTextStrokeWidth: 0, WebkitTextStrokeColor: "#000000" }}>MoodCheck</h1>
          <button onClick={() => navigate('/timeline')} style={{ borderStyle: "solid", borderWidth: 2, height: 50, width: 50, backgroundColor: "#FEFBE9", borderRadius: 10, borderColor: "#F8CBA6", display: "flex", justifyContent: "center", alignItems: "center" }}><ListUnorderedIcon /></button>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F8CBA6" fill-opacity="1" d="M0,256L34.3,245.3C68.6,235,137,213,206,208C274.3,203,343,213,411,213.3C480,213,549,203,617,170.7C685.7,139,754,85,823,101.3C891.4,117,960,203,1029,202.7C1097.1,203,1166,117,1234,96C1302.9,75,1371,117,1406,138.7L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>

      <div style={{ padding: 20, height: "90vh" }}>
        <h2 style={{ color: "#808080", margin: 0}}>How are you feeling?</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", flexWrap: "wrap", justifyContent: "center", width:"100%", height: 250 }}>
          {emojis.map((x, index) =>
            <button key={index} onClick={() => setSelectedEmoji(x)} style={{ fontSize: 60, backgroundColor: "#FEFBE9", textAlign: "center", borderRadius: 10, borderColor: "#F8CBA6", borderStyle: "solid", borderWidth: 2 }}>{x}</button>
          )}
        </div>
        <h2 style={{ color: "#808080", }}>Why {selectedEmoji}?</h2>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} style={{ resize: "none", width: "100%", height: 120, borderColor: "#F8CBA6", borderStyle: "solid", borderWidth: 2, fontFamily: "Arial", fontSize: 16, color: "#404040", padding: 10 }}>
        </textarea>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>

          <button onClick={addMood} style={{marginBottom: 50, marginLeft: "auto", marginRight: "auto", backgroundColor: "#000000", color: "#ffffff", padding: "15px 30px", borderRadius: 30, fontWeight: "bold", border: "none" }}>Save</button>

        </div>
      </div>
    </div>
  )
}

