import firebase from "firebase/compat/app"
import "firebase/compat/auth" 

const app = firebase.initializeApp({
  apiKey: "AIzaSyDLce6JvFej1n40q7D0SNMLvmboud2WQck",
  authDomain: "chat-auth-61ff4.firebaseapp.com",
  projectId: "chat-auth-61ff4",
  storageBucket: "chat-auth-61ff4.appspot.com",
  messagingSenderId: "1059053239927",
  appId: "1:1059053239927:web:714bec55d8dce8c0b0d072"
})

export const Auth = app.auth();
export default app