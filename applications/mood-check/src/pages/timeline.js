import React, { useEffect, useState } from 'react'
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon';
import * as moment from "moment";
import { navigate } from 'gatsby';
import { doc, getDoc } from "firebase/firestore";
import { db, useAuth } from '../utils/firebase';




export default function Timeline() {
    let user = useAuth();


    const [data, setData] = useState([]);
    let dateMap = {};


    const structureData = (array) => {
        array.map(data => {
            let date = moment(data.time).format("LL");
            let entry = data;
            console.log(data)
            if (dateMap[date]) {
                // add it
                dateMap[date].entries.push(entry)
            } else {
                dateMap[date] = {};
                dateMap[date].date = date;
                dateMap[date].entries = [entry];
            }
        })
        return Object.values(dateMap);
    }

    useEffect(() => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    // console.log("Document data:", new Date(docSnap.data().data[1].time));
                    let x = structureData(docSnap.data().data);
                    x.reverse()
                    setData(x);
                } else {
                    // doc.data() will be undefined in this case
                    // console.log("No such document!");
                }
            })
        }
    }, [user])





    // let data = [
    //     {
    //         date: new Date(),
    //         entries: [
    //             {
    //                 time: new Date(),
    //                 emoji: '🙂',
    //                 reason: "Just published"
    //             },
    //             {
    //                 time: new Date(),
    //                 emoji: '😃',
    //                 reason: "Just published"
    //             },
    //             {
    //                 time: new Date(),
    //                 emoji: '🙂',
    //                 reason: "Just published"
    //             }
    //         ]
    //     },
    //     {
    //         date: new Date(),
    //         entries: [
    //             {
    //                 time: new Date(),
    //                 emoji: '🙂',
    //                 reason: "Just published"
    //             }
    //         ]
    //     },
    //     {
    //         date: new Date(),
    //         entries: [
    //             {
    //                 time: new Date(),
    //                 emoji: '🙂',
    //                 reason: "Just published"
    //             }
    //         ]
    //     }
    // ];




    return (
        <div style={{ height: "100vh" }}>

            <div style={{ height: "10vh", display: "flex", position: "sticky", top: 0, marginBottom: -3 }}>
                <div style={{ backgroundColor: "#F8CBA6", color: "#808080", fontSize: 24, width: "100%", alignItems: "center", display: "flex", justifyContent: "space-evenly" }}>
                    <button onClick={() => navigate('/home')} style={{ borderStyle: "solid", borderWidth: 2, height: 50, width: 50, backgroundColor: "#FEFBE9", borderRadius: 10, borderColor: "#F8CBA6", display: "flex", justifyContent: "center", alignItems: "center" }}><ArrowLeftLineIcon /></button>
                    <h1 style={{ margin: 0, color: "#fff", WebkitTextStrokeWidth: 0, WebkitTextStrokeColor: "#000000", WebkitTextFillColor: "#fff" }}>MoodCheck</h1>
                    <button style={{ visibility: "hidden", borderColor: "#F8CBA6", borderStyle: "solid", borderWidth: 2, height: 50, width: 50, backgroundColor: "#FEFBE9", borderRadius: 10 }}><ArrowLeftLineIcon /></button>

                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F8CBA6" fill-opacity="1" d="M0,256L34.3,245.3C68.6,235,137,213,206,208C274.3,203,343,213,411,213.3C480,213,549,203,617,170.7C685.7,139,754,85,823,101.3C891.4,117,960,203,1029,202.7C1097.1,203,1166,117,1234,96C1302.9,75,1371,117,1406,138.7L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>

            <div style={{ height: "90vh", padding: 20 }}>
                {data && data.map(x => <div>
                    <h2 style={{ color: "#808080" }}>{moment(x.date).format('LL')}</h2>
                    {x.entries.map(y =>
                        <div>
                            <div style={{ textAlign: "end", fontSize: 12, color: "#808080" }}>{moment(y.time).format("hh:mm a")}</div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ fontSize: 32 }}>{y.emoji}</div>
                                <div style={{ minHeight: 50, borderRadius: 10, width: "80vw", backgroundColor: "#efefef60", padding: 10, color: "#808080" }}>
                                    {y.reason}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                )}

            </div>
        </div>
    )
}
