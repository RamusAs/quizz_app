import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { auth } from "../firebase"
import { UserData } from "../helpers"
import { createUser } from "./firestoreService"

export const registerUser = async ({ email, password, name }: UserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Update user profile with name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name })
      await createUser({ email, password, name, id: auth.currentUser.uid })
    }

    console.log("Utilisateur inscrit :", userCredential.user)
    return userCredential.user
  } catch (error) {
    console.error("Erreur d'inscription :", error.message)
    throw error
  }
}

export const loginUser = async ({ email, password }: UserData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log("Utilisateur connecté :", userCredential.user)
  } catch (error) {
    console.error("Erreur de connexion :", error.message)
  }
}
