import React, { useEffect } from 'react'
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon';
import { db, FirebaseSignIn, useAuth } from '../utils/firebase';
import { doc, getDoc, setDoc  } from "firebase/firestore";
import { navigate } from 'gatsby';


export default function Login() {
    // TODO: handle login with google, and creating user account

    let user = useAuth();

    useEffect(() => {
        // console.log(user)
        // find the user 
        if (user) {

            const docRef = doc(db, "users", user.uid);
            getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    navigate('/home')
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    // create user'c collection
                    setDoc(doc(db, "users",user.uid), {
                        name: user.displayName,
                        email: user.email,
                        id: user.uid,
                        photoUrl: user.photoURL 
                      }).then(done=> {
                        console.log("user created successfuly");
                         // proceed
                         navigate('/home')
                      })
                }
            })
        } else {
            // do nothing
        }


    }, [user])

    return (
        <div style={{ height: "100vh" }}>
            <div style={{ height: "30vh", backgroundColor: "#F8CBA6", marginBottom: -2, backgroundImage: "url('/faces.png')", backgroundSize: "cover" }}></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F8CBA6" fill-opacity="1" d="M0,256L34.3,245.3C68.6,235,137,213,206,208C274.3,203,343,213,411,213.3C480,213,549,203,617,170.7C685.7,139,754,85,823,101.3C891.4,117,960,203,1029,202.7C1097.1,203,1166,117,1234,96C1302.9,75,1371,117,1406,138.7L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
            <div style={{ textAlign: "center", height: 200 }}>
                <h1 style={{ color: "#808080", textAlign: "center", marginTop: 50, marginBottom: 40 }}>MoodCheck</h1>
                <button style={{ padding: "10px 30px", border: "solid #F8CBA6 3px", color: "#606060", fontSize: 16, borderRadius: 30, margin: "auto", backgroundColor: "#F8CBA6", display: "flex", alignItems: "center", justifyContent: "space-between", maring: 100, }} onClick={FirebaseSignIn} > <GoogleFillIcon style={{ marginRight: 20 }} /> Continue with Google</button>
            </div>
        </div>
    )
}
