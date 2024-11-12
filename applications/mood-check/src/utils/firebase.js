// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, connectAuthEmulator, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtpDqHzf1op_EB6ceHmWPyLyDDByk3qg4",
  authDomain: "mood-check-13262.firebaseapp.com",
  projectId: "mood-check-13262",
  storageBucket: "mood-check-13262.appspot.com",
  messagingSenderId: "950066022726",
  appId: "1:950066022726:web:d7e6f5d7310802ea3bfd47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const FirebaseSignIn = async () => {
    console.log("Firebase auth in progresss")
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error)
      });
  
}


export const useAuth = () => {
    const [user, setUser] = useState();
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user)
        } else {
          setUser()
        }
      });
    }, []);
  
    return user
  }


export {auth, db}
