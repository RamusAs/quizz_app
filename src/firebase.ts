import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD2oBqWrJt7OAMTOatYIx2ZTeO0UilgtZQ",
  authDomain: "trivia-quiz-9ec26.firebaseapp.com",
  projectId: "trivia-quiz-9ec26",
  storageBucket: "trivia-quiz-9ec26.firebasestorage.app",
  messagingSenderId: "268157438868",
  appId: "1:268157438868:web:875953c2b9259774355d81",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
