import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore"
import axios, { AxiosError } from "axios"
import { Category, Question } from "../helpers"

const BASE_URL = "https://opentdb.com"
const API_URL = "https://opentdb.com/api.php"

const THROTTLE_DELAY = 3000 // Délai entre les requêtes en ms

export async function syncData(db: any) {
  try {
    console.log("Synchronisation des catégories...")

    // Récupérer les catégories
    const categoriesResponse = await axios.get(`${BASE_URL}/api_category.php`)
    const categories: Category[] = categoriesResponse.data.trivia_categories

    // Supprimer les anciennes catégories
    const categoriesCollection = collection(db, "categories")
    const categoriesSnapshot = await getDocs(categoriesCollection)
    const deleteCategoryPromises = categoriesSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    )
    await Promise.all(deleteCategoryPromises)

    // Ajouter les nouvelles catégories
    const addCategoryPromises = categories.map((category: Category) =>
      addDoc(categoriesCollection, {
        id: category.id,
        name: category.name,
      })
    )
    await Promise.all(addCategoryPromises)

    console.log("Catégories synchronisées!")

    console.log("Synchronisation des questions...")

    // Supprimer les anciennes questions
    const questionsCollection = collection(db, "questions")
    const questionsSnapshot = await getDocs(questionsCollection)
    const deleteQuestionPromises = questionsSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    )
    await Promise.all(deleteQuestionPromises)

    const token = await fetchSessionToken()

    // Récupérer les questions pour chaque catégorie
    for (const category of categories) {
      console.log(
        `Récupération des questions pour la catégorie: ${category.name}`
      )
      const questionsResponse = await fetchQuestions(category.id, token)

      const questions = questionsResponse.map((q: Question) => ({
        category_name: q.category,
        category_id: category.id,
        type: q.type,
        difficulty: q.difficulty,
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }))

      // Ajouter les questions à la collection "questions"
      const addQuestionPromises = questions.map((question) =>
        addDoc(questionsCollection, question)
      )
      await Promise.all(addQuestionPromises)

      console.log(`Catégorie "${category.name}" synchronisée avec succès.`)
    }

    console.log("Synchronisation terminée!")
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error)
  }
}

const fetchWithRetry = async (url: string, retries = 3, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url) // Si la requête réussit, elle retourne ici
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 429 && i < retries - 1) {
        console.warn(`Retrying request... Attempt ${i + 1}`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      } else {
        throw error // Si toutes les tentatives échouent, on lève l'erreur
      }
    }
  }
}

const fetchQuestions = async (
  categoryId: number | undefined,
  token: string
): Promise<Question[]> => {
  let allQuestions: Question[] = []
  let hasMoreQuestions = true

  while (hasMoreQuestions) {
    const response = await fetchWithRetry(
      `${API_URL}?amount=50&category=${categoryId}&token=${token}`
    )

    if (response?.data.response_code === 4) {
      // Toutes les questions ont été récupérées pour cette catégorie
      hasMoreQuestions = false
    } else if (response?.data.response_code !== 0) {
      throw new Error(
        `Erreur API (code ${response?.data.response_code}): Impossible de récupérer les questions`
      )
    } else {
      // Ajouter les questions récupérées
      allQuestions = [...allQuestions, ...response.data.results]

      // Si moins de 50 questions sont retournées, il n'y en a plus à récupérer
      if (response.data.results.length < 50) {
        hasMoreQuestions = false
      }
    }

    // Attendre 2 secondes entre les appels pour éviter les limitations
    await new Promise((resolve) => setTimeout(resolve, THROTTLE_DELAY))
  }

  return allQuestions
}

const fetchSessionToken = async (): Promise<string> => {
  const response = await axios.get<{ token: string }>(
    `${BASE_URL}/api_token.php?command=request`
  )
  return response.data.token
}
