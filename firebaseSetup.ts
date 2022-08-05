import firebase from "firebase/app"
import "firebase/auth"
import { API_KEY } from "@env"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "wdcc-uads.firebaseapp.com",
  projectId: "wdcc-uads",
  storageBucket: "wdcc-uads.appspot.com",
  messagingSenderId: "1060132196663",
  appId: "1:1060132196663:web:73e92d039621253e508ab2",
} // this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig)
export default firebase

// export const auth = firebase.auth();
