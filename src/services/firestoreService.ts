import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore"
import { db } from "../firebase"

import { UserData } from "../helpers"
import { getAuth } from "firebase/auth"

export async function createUser(userData: UserData) {
  try {
    const userId = userData.id

    if (!userId) {
      console.error("L'UID de l'utilisateur est manquant !")
      return
    }

    // Récupérer toutes les catégories pour initialiser le progrès
    const categoriesCollection = collection(db, "categories")
    const categoriesSnapshot = await getDocs(categoriesCollection)

    // Construire l'objet de progrès pour chaque catégorie
    const progress = categoriesSnapshot.docs.reduce((acc, category) => {
      acc[category.id] = {
        answeredCount: 0,
        correctCount: 0,
        lastAnswered: null,
        remainingQuestions: [], // Préremplir ou laisser vide selon les besoins
      }
      return acc
    }, {})

    // Vérifie si l'utilisateur existe déjà
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      console.log("L'utilisateur existe déjà !")
      return
    }

    // Ajouter l'utilisateur avec l'UID comme clé primaire
    await setDoc(userRef, {
      id: userId, // UID de Firebase
      name: userData.name,
      email: userData.email,
      progress, // Initialisation du progrès
    })

    console.log("Utilisateur créé avec succès !")
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error)
  }
}

async function addCategory(id, name) {
  try {
    await db.collection("categories").add({
      id,
      name,
    })
    console.log("Category added successfully!")
  } catch (error) {
    console.error("Error adding category: ", error)
  }
}

export async function getCategories() {
  try {
    const categoriesCollection = collection(db, "categories")
    const snapshot = await getDocs(categoriesCollection)
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return categories
  } catch (error) {
    console.error("Error fetching categories: ", error)
  }
}

async function updateCategory(docId, newData) {
  try {
    await db.collection("categories").doc(docId).update(newData)
    console.log("Category updated successfully!")
  } catch (error) {
    console.error("Error updating category: ", error)
  }
}

async function deleteCategory(docId) {
  try {
    await db.collection("categories").doc(docId).delete()
    console.log("Category deleted successfully!")
  } catch (error) {
    console.error("Error deleting category: ", error)
  }
}

export async function getQuestions() {
  try {
    const snapshot = await getDocs(collection(db, "questions"))
    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(questions)
    return questions
  } catch (error) {
    console.error("Error fetching questions: ", error)
  }
}

export async function getCategoryQuestions(categoryId: number) {
  try {
    // Crée une requête pour filtrer par `category_id`
    const questionsQuery = query(
      collection(db, "questions"),
      where("category_id", "==", categoryId)
    )

    // Exécute la requête
    const snapshot = await getDocs(questionsQuery)

    // Mappe les résultats pour inclure l'ID du document
    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return questions
  } catch (error) {
    console.error("Error fetching questions: ", error)
  }
}

export async function getCategory(categoryId: number) {
  try {
    // Crée une requête pour filtrer par `category_id`
    const questionsQuery = query(
      collection(db, "categories"),
      where("id", "==", categoryId)
    )

    // Exécute la requête
    const snapshot = await getDocs(questionsQuery)

    // Mappe les résultats pour inclure l'ID du document
    const categories = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }))

    return categories[0]
  } catch (error) {
    console.error("Error fetching questions: ", error)
  }
}

export async function getCategoriesWithQuestionCount() {
  try {
    const categoriesCollection = collection(db, "categories")
    const categoriesSnapshot = await getDocs(categoriesCollection)

    const categoriesWithCount = []

    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryData = categoryDoc.data()
      const categoryId = categoryData.id
      const uid = categoryDoc.id

      // Compter le nombre de questions associées à cette catégorie
      const questionsQuery = query(
        collection(db, "questions"),
        where("category_id", "==", categoryId)
      )
      const questionsSnapshot = await getDocs(questionsQuery)
      const questionCount = questionsSnapshot.size // Le nombre de documents dans la requête

      categoriesWithCount.push({
        ...categoryData,
        question_count: questionCount,
        uid: uid,
      })
    }

    return categoriesWithCount
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error)
  }
}

export async function updateUserProgress(
  categoryId: string,
  updates: {
    answeredCount?: number
    correctCount?: number
    lastAnswered?: string
    remainingQuestions?: object[]
  }
) {
  try {
    // Récupérer l'utilisateur actuel
    const userId = getCurrentUser()?.uid
    if (!userId) {
      console.error("Aucun utilisateur connecté !")
      return
    }

    console.log("User ID récupéré :", userId)

    // Vérifier l'existence du document utilisateur
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      console.error("Document utilisateur introuvable !")
      return
    }

    // Récupérer les données actuelles de l'utilisateur
    const userData = userDoc.data()
    const progress = userData.progress || {}

    // Vérifier si la catégorie existe dans les progrès
    if (!progress[categoryId]) {
      console.error("Catégorie non trouvée dans les progrès de l'utilisateur !")
      return
    }

    // Mettre à jour les progrès pour la catégorie spécifiée
    progress[categoryId] = {
      ...progress[categoryId],
      ...updates, // Appliquer les mises à jour
    }

    // Mettre à jour le document utilisateur dans Firestore
    await updateDoc(userRef, { progress })

    console.log("Progrès utilisateur mis à jour avec succès !")
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des progrès de l'utilisateur :",
      error
    )
  }
}

export async function getUserProgress() {
  const userId = getCurrentUser()?.uid

  try {
    // Crée une requête pour filtrer par `category_id`
    const userQuery = query(collection(db, "users"), where("id", "==", userId))

    // Exécute la requête
    const snapshot = await getDocs(userQuery)

    // Mappe les résultats pour inclure l'ID du document
    const user = snapshot.docs[0].data()

    return user.progress
  } catch (error) {
    console.error("Error fetching questions: ", error)
  }
}

export async function getProfile() {
  const userId = getCurrentUser()?.uid

  try {
    // Crée une requête pour filtrer par `category_id`
    const userQuery = query(collection(db, "users"), where("id", "==", userId))

    // Exécute la requête
    const snapshot = await getDocs(userQuery)

    // Mappe les résultats pour inclure l'ID du document
    const user = snapshot.docs[0].data()

    return user
  } catch (error) {
    console.error("Error fetching questions: ", error)
  }
}

export function getCurrentUser() {
  const auth = getAuth()
  const currentUser = auth.currentUser

  return currentUser // Retourne l'utilisateur connecté s'il y en a un
}
